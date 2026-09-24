import { z } from "zod";

// ============================================
// Environment Variables Schema
// ============================================

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(1),
  N8N_WEBHOOK_SECRET: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

// ============================================
// News Article Validation
// ============================================

export const newsArticleInputSchema = z.object({
  title: z.string().min(1).max(500),
  originalTitle: z.string().optional(),
  url: z.string().url(),
  sourceName: z.string().min(1),
  sourceType: z.enum(["PRIMARY", "SECONDARY"]),
  author: z.string().optional(),
  publishedAt: z.string().datetime(),
  imageUrl: z.string().url().optional(),
  excerpt: z.string().optional(),
  summary: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  language: z.string().default("en"),
  contentHash: z.string().min(1),
});

// ============================================
// Timeline Event Validation
// ============================================

export const timelineEventInputSchema = z.object({
  date: z.string().datetime(),
  title: z.string().min(1).max(300),
  description: z.string().min(1),
  category: z.enum([
    "ICC",
    "PHILIPPINE_GOVERNMENT",
    "SARA_DUTERTE",
    "LEGAL_PROCEEDINGS",
    "PUBLIC_STATEMENTS",
    "INTERNATIONAL_DEVELOPMENTS",
  ]),
  sources: z.array(z.string()).min(1),
});

// ============================================
// Document Validation
// ============================================

export const documentInputSchema = z.object({
  title: z.string().min(1).max(500),
  organization: z.string().min(1),
  documentType: z.string().min(1),
  date: z.string().datetime(),
  description: z.string().min(1),
  url: z.string().url(),
  sourceId: z.string().optional(),
  category: z.enum([
    "ICC_DOCUMENTS",
    "PHILIPPINE_GOVERNMENT",
    "COURT_DOCUMENTS",
    "OFFICIAL_STATEMENTS",
    "LAWS_TREATIES",
    "INTERNATIONAL_DOCUMENTS",
    "NEWS_REPORTS",
  ]),
});

// ============================================
// Claim Validation
// ============================================

export const claimInputSchema = z.object({
  claim: z.string().min(1),
  source: z.string().min(1),
  date: z.string().datetime(),
  evidence: z.string().optional(),
  status: z.enum([
    "VERIFIED_FACT",
    "OFFICIAL_STATEMENT",
    "ALLEGATION",
    "DISPUTED_CLAIM",
    "CONTEXT_NEEDED",
    "NOT_INDEPENDENTLY_VERIFIED",
  ]),
  context: z.string().optional(),
  whatIsVerified: z.string().optional(),
  whatIsUncertain: z.string().optional(),
});

// ============================================
// Source Validation
// ============================================

export const sourceInputSchema = z.object({
  name: z.string().min(1),
  organization: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["PRIMARY", "SECONDARY"]),
  description: z.string().optional(),
});

// ============================================
// Statement Validation
// ============================================

export const statementInputSchema = z.object({
  date: z.string().datetime(),
  speaker: z.string().min(1),
  statement: z.string().min(1),
  context: z.string().optional(),
  source: z.string().min(1),
  sourceUrl: z.string().url().optional(),
});

// ============================================
// n8n Webhook Payload Validation
// ============================================

export const n8nWebhookPayloadSchema = z.object({
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  url: z.string().url(),
  sourceName: z.string().min(1),
  sourceType: z.enum(["PRIMARY", "SECONDARY"]),
  author: z.string().optional(),
  publishedAt: z.string().datetime(),
  imageUrl: z.string().url().optional(),
  excerpt: z.string().optional(),
  summary: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  language: z.string().default("en"),
  contentHash: z.string().min(1),
  keyFacts: z.array(z.string()).optional(),
  claims: z.array(z.string()).optional(),
  uncertainties: z.array(z.string()).optional(),
  people: z.array(z.string()).optional(),
  organizations: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
});

// ============================================
// Pagination Validation
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});