# n8n Workflows for Sara Duterte & ICC Website

This directory contains n8n workflow configurations for automated news monitoring and content processing.

## Overview

The n8n automation system:
1. Monitors RSS feeds and news APIs for relevant content
2. Filters articles by relevance and keywords
3. Uses AI (Claude) to summarize and extract key information
4. Sends articles to the website via webhook
5. All articles require human approval before publication

## Workflows

### 1. News Monitor (`news-monitor.json`)

**Purpose**: Continuously monitor news sources for ICC/Philippines/Sara Duterte content

**Trigger**: Schedule (every 30-60 minutes)

**Steps**:
1. Fetch articles from configured RSS feeds
2. Normalize article data
3. Check for duplicates (by URL/content hash)
4. Filter by relevance (keyword matching)
5. Validate source credibility
6. Send to AI for summarization
7. Classification and tagging
8. Send to webhook endpoint
9. Log results

**Configuration Required**:
- RSS/API feed URLs
- Keywords for filtering
- Claude API credentials
- Webhook URL and secret
- Schedule interval

### 2. Daily Digest (`daily-digest.json`)

**Purpose**: Send daily summary to admins

**Trigger**: Schedule (once daily, e.g., 9 AM)

**Steps**:
1. Query database for pending articles
2. Count approved/rejected articles
3. List failed feeds
4. Format digest email/notification
5. Send via Telegram/Email/Slack

**Configuration Required**:
- Notification channel (Telegram/Email/Slack)
- Credentials for chosen channel
- Admin recipient IDs
- Schedule time

## Setup Instructions

### Prerequisites

- n8n instance (self-hosted or cloud)
- Access to your n8n workflow editor
- Credentials configured in n8n

### Import Workflows

1. Open your n8n instance
2. Click "+ Add workflow"
3. Click "Import from File"
4. Select `news-monitor.json`
5. Repeat for `daily-digest.json`

### Configure Credentials

#### 1. Webhook Credentials

In the webhook node:
- **URL**: `https://your-domain.com/api/webhooks/n8n/news`
- **Authentication**: Header Auth
- **Header Name**: `Authorization`
- **Header Value**: `Bearer YOUR_N8N_WEBHOOK_SECRET`

#### 2. Claude API (Anthropic)

Create "Anthropic" credential:
- **API Key**: Your Anthropic API key (sk-ant-...)

#### 3. RSS Feed Sources

Configure HTTP Request nodes for each source:
```
Primary Sources (ICC/Government):
- ICC Press Releases: https://www.icc-cpi.int/rss
- Philippine News Agency: https://www.pna.gov.ph/rss
- Official Gazette: https://www.officialgazette.gov.ph/feed/

Secondary Sources (News):
- Reuters Philippines: https://www.reuters.com/places/philippines/feed
- Rappler: https://www.rappler.com/nation/rss
- Inquirer: https://newsinfo.inquirer.net/feed
```

#### 4. Notification Channels (Optional)

**Telegram**:
- Bot Token
- Chat ID

**Email**:
- SMTP credentials

**Slack**:
- Webhook URL

### Configure Filters

#### Keywords for Relevance

Edit the "Filter" node:
```javascript
const keywords = [
  'Sara Duterte',
  'Vice President Sara',
  'ICC Philippines',
  'International Criminal Court Philippines',
  'ICC investigation',
  'Rome Statute Philippines'
];

const text = ($node["RSS Feed"].json.title + ' ' + 
              $node["RSS Feed"].json.description).toLowerCase();

return keywords.some(keyword => text.includes(keyword.toLowerCase()));
```

### Configure AI Summarization

#### Claude Prompt

In the "AI Summary" node (HTTP Request to Anthropic):

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "You are preparing a neutral factual summary for an informational website.\n\nSummarize only what is supported by the supplied source.\n\nDo not:\n- persuade\n- endorse\n- attack\n- speculate about motives\n- invent facts\n- add unsupported information\n- present allegations as established facts\n\nClearly distinguish:\n- confirmed facts\n- official statements\n- allegations\n- disputed claims\n- analysis\n\nPreserve important dates, names, legal terminology, and attribution.\n\nReturn JSON:\n{\n  \"headline\": \"...\",\n  \"summary\": \"...\",\n  \"key_facts\": [...],\n  \"claims\": [...],\n  \"uncertainties\": [...],\n  \"people\": [...],\n  \"organizations\": [...],\n  \"topics\": [...],\n  \"source_type\": \"PRIMARY\" | \"SECONDARY\"\n}\n\nArticle:\n{{$node[\"Fetch Content\"].json.content}}"
    }
  ]
}
```

### Configure Deduplication

In the "Check Duplicates" node:

```javascript
// Generate content hash
const crypto = require('crypto');
const content = $node["Normalize"].json.title + $node["Normalize"].json.url;
const hash = crypto.createHash('sha256').update(content).digest('hex');

// Check if hash exists in recent articles
// This requires database query or in-memory cache
return {
  json: {
    ...$node["Normalize"].json,
    contentHash: hash,
    isDuplicate: false // Set based on lookup
  }
};
```

### Activate Workflows

1. Click "Active" toggle on each workflow
2. Test with manual trigger
3. Monitor execution logs

## Testing

### Test News Monitor

1. Open `news-monitor` workflow
2. Click "Execute Workflow" button
3. Check execution log
4. Verify article appears in admin dashboard as PENDING

### Test Webhook Manually

```bash
curl -X POST https://your-domain.com/api/webhooks/n8n/news \
  -H "Authorization: Bearer YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test: ICC Updates Investigation",
    "originalTitle": "ICC Updates Investigation",
    "url": "https://example.com/test-article",
    "sourceName": "Test Source",
    "sourceType": "SECONDARY",
    "publishedAt": "2024-01-15T10:00:00Z",
    "summary": "The International Criminal Court provided an update on its investigation.",
    "category": "ICC",
    "tags": ["ICC", "investigation"],
    "contentHash": "test_hash_12345"
  }'
```

Expected response:
```json
{
  "success": true,
  "articleId": "...",
  "message": "Article received and awaiting human review"
}
```

## Monitoring

### Check Workflow Execution

1. Open n8n dashboard
2. View "Executions" tab
3. Filter by workflow
4. Review success/failure logs

### Common Issues

**No articles discovered**:
- Check RSS feed URLs are valid
- Verify keywords match article content
- Review execution logs for fetch errors

**Duplicate articles**:
- Check content hash generation
- Verify deduplication logic
- Review database for existing URLs

**Webhook failures**:
- Verify webhook URL is correct
- Check authorization header/secret
- Review website logs for errors
- Test webhook manually

**AI summarization errors**:
- Check Claude API key is valid
- Review API quota/limits
- Verify prompt format
- Check response parsing

## Rate Limiting

Respect source rate limits:
- Major news sites: 1 request per 5 seconds
- Government sites: 1 request per 10 seconds
- ICC website: 1 request per 30 seconds

Configure delays in n8n "Wait" nodes.

## Data Privacy

- Do not log sensitive user data
- Do not store full article content longer than necessary
- Respect robots.txt
- Follow terms of service for each source

## Maintenance

### Weekly
- Review failed executions
- Check source availability
- Update keywords if needed

### Monthly
- Review article quality
- Adjust AI prompts if needed
- Add/remove news sources
- Update schedule intervals

## Troubleshooting

### Workflow Not Running

1. Check "Active" toggle is ON
2. Verify schedule trigger configuration
3. Review n8n instance logs
4. Check n8n instance is running

### Articles Not Appearing in Dashboard

1. Check webhook is receiving data (n8n logs)
2. Verify webhook URL is correct
3. Check authorization header
4. Review website API logs
5. Verify database connection

### Too Many Irrelevant Articles

1. Tighten keyword filters
2. Add negative keywords
3. Improve relevance scoring
4. Adjust source priorities

## Support

For n8n-specific issues, consult:
- n8n Documentation: https://docs.n8n.io
- n8n Community: https://community.n8n.io

For workflow-specific issues, check website logs and database.