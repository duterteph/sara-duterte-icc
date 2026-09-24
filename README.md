# Sara Duterte & ICC Information Website

A complete, production-ready, neutral informational website about Vice President Sara Duterte, the Philippines, and the International Criminal Court (ICC).

## Overview

This is an independent information/documentary platform designed to help visitors understand publicly available information concerning Sara Duterte, the International Criminal Court, and related Philippine legal and political developments.

**Important:** This website follows strict editorial principles:
- **Neutrality**: Does not persuade, endorse, or attack any political actor
- **Attribution**: All claims are clearly attributed to their sources
- **Legal accuracy**: Uses legal terminology correctly
- **Source priority**: Prioritizes primary sources and official documents

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: NextAuth.js
- **AI Integration**: Anthropic Claude API
- **Automation**: n8n for news monitoring
- **Deployment**: Vercel

## Features

### Public-Facing
- Interactive timeline of events
- ICC explainer pages
- Document archive
- Claims/fact-check system
- News updates with source attribution
- Search functionality
- Responsive design with dark/light mode

### Admin Dashboard
- News article review and approval system
- Timeline event management
- Document management
- Content moderation
- Audit trail for all political content changes

### Automation
- n8n workflows for automated news monitoring
- AI-powered article summarization
- Deduplication and relevance filtering
- Human approval required before publication

## Installation

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL 14+
- n8n instance (self-hosted or cloud)
- Anthropic API key

### Setup

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd sara-duterte-icc
npm install
```

2. **Environment configuration**
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/sara_duterte_icc
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
N8N_WEBHOOK_SECRET=<generate with: openssl rand -base64 32>
ANTHROPIC_API_KEY=sk-ant-your-key-here
ADMIN_EMAIL=admin@example.com
```

3. **Database setup**
```bash
# Generate migration files
npm run db:generate

# Apply migrations
npm run db:migrate

# Or push schema directly (development)
npm run db:push
```

4. **Create first admin user**

Run this SQL directly in your PostgreSQL database:
```sql
-- Generate password hash for "admin123" (change this!)
-- Use bcrypt online tool or Node.js to generate hash

INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at)
VALUES (
  'admin_' || gen_random_uuid(),
  'admin@example.com',
  'Admin User',
  '$2a$10$...',  -- Replace with bcrypt hash
  'ADMIN',
  NOW(),
  NOW()
);
```

5. **Run development server**
```bash
npm run dev
```

Visit http://localhost:3000

### Production Deployment

#### Vercel Deployment

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
- Import project from GitHub
- Add environment variables
- Deploy

3. **Configure PostgreSQL**
- Use Vercel Postgres, Supabase, or another PostgreSQL provider
- Update `DATABASE_URL` in Vercel environment variables
- Run migrations:
```bash
npm run db:migrate
```

## n8n Integration

### Setup n8n Workflows

1. **Import workflows**
- Located in `/n8n/workflows/`
- Import `news-monitor.json` into your n8n instance
- Import `daily-digest.json` for admin notifications

2. **Configure credentials**

In n8n, set up:
- **Webhook URL**: Your deployed URL + `/api/webhooks/n8n/news`
- **Webhook Secret**: Same as `N8N_WEBHOOK_SECRET` in `.env`
- **Anthropic API**: For AI summarization
- **RSS/API Sources**: Configure news feeds

3. **Test webhook**
```bash
curl -X POST http://localhost:3000/api/webhooks/n8n/news \
  -H "Authorization: Bearer YOUR_N8N_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "url": "https://example.com/test",
    "sourceName": "Test Source",
    "sourceType": "PRIMARY",
    "publishedAt": "2024-01-01T00:00:00Z",
    "summary": "Test summary",
    "category": "ICC",
    "tags": ["test"],
    "contentHash": "test123"
  }'
```

## Project Structure

```
/app
  /page.tsx                    # Homepage
  /timeline                    # Timeline page
  /icc-explained              # ICC explainer
  /sara-duterte               # Sara Duterte page
  /philippines-and-icc        # Philippines & ICC
  /legal-context              # Legal context
  /documents                  # Document archive
  /claims                     # Claims/fact-check
  /updates                    # News updates
  /sources                    # Source directory
  /methodology                # Methodology page
  /about                      # About page
  /admin                      # Admin dashboard
    /news                     # News review
    /timeline                 # Timeline management
    /documents                # Document management
  /api
    /auth                     # NextAuth endpoints
    /news                     # News API
    /webhooks/n8n             # n8n webhook

/components
  /layout                     # Header, footer
  /ui                         # shadcn/ui components

/lib
  /db                         # Database schema, connection
  auth.ts                     # Authentication config
  validation.ts               # Zod schemas
  utils.ts                    # Utilities

/types
  index.ts                    # TypeScript types

/n8n
  /workflows                  # n8n workflow JSONs
  README.md                   # n8n setup guide
```

## Editorial Workflow

### News Publication Process

```
1. n8n discovers article from RSS/API
2. AI processes and summarizes
3. Article saved as PENDING
4. Admin reviews in dashboard
5. Admin approves/rejects/edits
6. Approved articles published to website
```

### Content Management

- All political content stored in database (not hardcoded)
- Edit history tracked with audit trail
- Changes require admin authentication
- Sources always attributed

## API Endpoints

### Public
- `GET /api/news` - Fetch published articles
- `GET /api/news/[id]` - Fetch single article

### Webhook (n8n)
- `POST /api/webhooks/n8n/news` - Receive articles from n8n

### Admin (Protected)
- `POST /api/admin/news/approve` - Approve article
- `POST /api/admin/news/reject` - Reject article
- `PATCH /api/admin/news/[id]` - Edit article

## Development

```bash
# Run dev server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Build
npm run build

# Database
npm run db:generate     # Generate migrations
npm run db:migrate      # Run migrations
npm run db:push         # Push schema (dev)
npm run db:studio       # Open Drizzle Studio
```

## Security

- Admin authentication required for all editorial actions
- Webhook endpoints protected with bearer token
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- XSS protection via React
- Rate limiting on API endpoints (implement in production)

## Monitoring

- Check `/admin` dashboard for pending articles
- Monitor n8n workflow execution logs
- Set up alerts for failed feeds
- Review audit trail for content changes

## License

This project is for informational purposes. Not affiliated with any government, political organization, or campaign.

## Disclaimer

This is an independent informational project. This website is not affiliated with the Office of the Vice President, the International Criminal Court, the Philippine government, or any political campaign.

## Support

For issues or questions, please file an issue in the repository.