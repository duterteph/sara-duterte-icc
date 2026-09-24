# Deployment Guide: Vercel

## Quick Deployment Steps

### 1. Push to GitHub

```bash
cd "C:\Users\remat\claude project\sara-duterte-icc"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Sara Duterte & ICC information website"

# Add your GitHub repository as remote
# Replace with your actual repository URL
git remote add origin https://github.com/YOUR_USERNAME/sara-duterte-icc.git

# Push to GitHub
git push -u origin main
```

If you don't have a GitHub repository yet:
1. Go to https://github.com/new
2. Create a new repository named `sara-duterte-icc`
3. Don't initialize it with README (we already have files)
4. Copy the repository URL and use it in the commands above

### 2. Set Up PostgreSQL Database

Choose one option:

**Option A: Vercel Postgres (Easiest)**
1. Go to Vercel Dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Choose a name and region
5. Vercel will auto-populate `DATABASE_URL` for your project

**Option B: Supabase (Free tier available)**
1. Sign up at https://supabase.com
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the connection string (use "Connection pooling" for better performance)
5. Save it as your `DATABASE_URL`

**Option C: Self-hosted PostgreSQL**
- Use your existing PostgreSQL server
- Format: `postgresql://user:password@host:port/database_name`

### 3. Deploy to Vercel

**Via Vercel Dashboard (Recommended for first deployment):**

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Configure environment variables (see Step 4)
6. Click "Deploy"

**Via Vercel CLI:**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd "C:\Users\remat\claude project\sara-duterte-icc"
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? sara-duterte-icc
# - In which directory is your code located? ./
# - Want to override the settings? No

# For production deployment
vercel --prod
```

### 4. Configure Environment Variables in Vercel

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database_name

# NextAuth
NEXTAUTH_URL=https://your-deployment-url.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# n8n Webhook
N8N_WEBHOOK_SECRET=<generate-with-openssl-rand-base64-32>

# Anthropic API (for n8n AI summarization)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Admin (optional, for reference)
ADMIN_EMAIL=admin@example.com

# Notifications (optional)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-deployment-url.vercel.app
```

**Generate secrets:**
```bash
# On Windows (Git Bash or WSL)
openssl rand -base64 32

# On PowerShell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### 5. Run Database Migrations

After deploying, you need to set up your database schema.

**Option A: Via Vercel CLI**
```bash
# Connect to your deployed project
vercel env pull .env.local

# Run migrations
npm run db:push
# Or: npm run db:generate && npm run db:migrate
```

**Option B: Via PostgreSQL client directly**
1. Connect to your database using a PostgreSQL client (pgAdmin, DBeaver, or psql)
2. Run the generated migration files from the `drizzle/` folder
3. Or use Drizzle Studio: `npm run db:studio`

### 6. Create First Admin User

Connect to your PostgreSQL database and run:

```sql
-- First, generate a bcrypt hash for your password
-- Use an online bcrypt generator or Node.js script
-- For password "admin123", hash would look like:
-- $2a$10$rE1YjH3pMxV8... (72 characters)

INSERT INTO users (
  id, 
  email, 
  name, 
  password_hash, 
  role, 
  created_at, 
  updated_at
)
VALUES (
  'usr_' || gen_random_uuid()::text,
  'admin@example.com',
  'Admin User',
  '$2a$10$YOUR_BCRYPT_HASH_HERE',  -- Replace with actual hash
  'ADMIN',
  NOW(),
  NOW()
);
```

**Generate bcrypt hash:**

Create a script `scripts/hash-password.js`:
```javascript
const bcrypt = require('bcryptjs');
const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);
console.log('Password:', password);
console.log('Hash:', hash);
```

Run it:
```bash
npm install bcryptjs
node scripts/hash-password.js yourpassword
```

### 7. Verify Deployment

1. Visit your Vercel deployment URL
2. Check the homepage loads correctly
3. Test navigation to different pages
4. Try logging into admin dashboard at `/admin/login`
5. Verify API endpoints work:
   - `https://your-site.vercel.app/api/news`
   - Test n8n webhook (see Step 8)

### 8. Configure n8n Integration

Now that your site is deployed, set up n8n:

1. **Update n8n webhook URL** in your n8n workflows:
   ```
   https://your-deployment-url.vercel.app/api/webhooks/n8n/news
   ```

2. **Configure authorization header** in n8n:
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_N8N_WEBHOOK_SECRET`

3. **Test the webhook**:
   ```bash
   curl -X POST https://your-deployment-url.vercel.app/api/webhooks/n8n/news \
     -H "Authorization: Bearer YOUR_N8N_WEBHOOK_SECRET" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Article",
       "url": "https://example.com/test-unique-url-12345",
       "sourceName": "Test Source",
       "sourceType": "PRIMARY",
       "publishedAt": "2024-01-15T10:00:00Z",
       "summary": "This is a test article to verify webhook integration.",
       "category": "ICC",
       "tags": ["test"],
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

4. **Import n8n workflows** from `/n8n/workflows/` directory
5. **Configure credentials** in n8n (Anthropic API, RSS feeds, etc.)
6. **Activate workflows**

### 9. Configure Custom Domain (Optional)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update environment variables:
   - `NEXTAUTH_URL=https://yourdomain.com`
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

### 10. Monitoring & Maintenance

**Vercel Dashboard:**
- Monitor deployment logs
- View analytics
- Check error reports

**Database:**
- Monitor connection pool usage
- Check query performance
- Back up regularly

**n8n:**
- Check workflow execution logs
- Monitor for failed feeds
- Review pending articles in admin dashboard

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Database migrations run
- [ ] Admin user created
- [ ] Homepage loads
- [ ] Admin login works
- [ ] API endpoints tested
- [ ] n8n webhook configured
- [ ] n8n workflows imported and activated
- [ ] Custom domain configured (optional)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript errors are resolved: `npm run typecheck`

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check database is accessible from Vercel's IP ranges
- Ensure SSL is enabled if required

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your deployment URL
- Ensure cookies are not blocked

### n8n Webhook Failing
- Verify webhook URL is correct
- Check authorization header is set correctly
- Review Vercel function logs for errors
- Test webhook manually with curl

### 500 Internal Server Error
- Check Vercel function logs
- Verify all environment variables are set
- Check database connection
- Review Next.js server logs

## Updating the Deployment

When you make changes:

```bash
# Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# Vercel will automatically deploy
# Or manually trigger: vercel --prod
```

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

## Cost Considerations

**Vercel:**
- Free tier: Suitable for small projects
- Pro tier ($20/mo): Needed for higher traffic or team features

**Database:**
- Vercel Postgres: Pay-as-you-go
- Supabase: Free tier available, then $25/mo
- Self-hosted: Your infrastructure costs

**n8n:**
- Self-hosted: Free (requires server)
- n8n Cloud: Starting at $20/mo

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Next.js documentation
3. Check PostgreSQL connection
4. Verify environment variables
5. Test locally first: `npm run dev`

## Next Steps

After successful deployment:
1. Add remaining page routes
2. Build admin dashboard
3. Create n8n workflow JSONs
4. Populate initial content
5. Test editorial workflow
6. Monitor performance
7. Set up alerts and notifications
