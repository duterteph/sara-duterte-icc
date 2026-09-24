import { pgTable, text, timestamp, boolean, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// ============================================
// News Articles
// ============================================

export const newsArticles = pgTable("news_articles", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  originalTitle: text("original_title"),
  url: text("url").notNull().unique(),
  sourceName: text("source_name").notNull(),
  sourceType: varchar("source_type", { length: 20 }).notNull(), // PRIMARY | SECONDARY
  author: text("author"),
  publishedAt: timestamp("published_at").notNull(),
  discoveredAt: timestamp("discovered_at").notNull().defaultNow(),
  imageUrl: text("image_url"),
  excerpt: text("excerpt"),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  language: text("language").default("en"),
  contentHash: text("content_hash").notNull(),
  verificationStatus: varchar("verification_status", { length: 30 }).notNull().default("UNVERIFIED"),
  editorStatus: varchar("editor_status", { length: 20 }).notNull().default("PENDING"),
  aiProcessed: boolean("ai_processed").default(false),
  humanReviewed: boolean("human_reviewed").default(false),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  publishedAtIdx: index("news_articles_published_at_idx").on(table.publishedAt),
  editorStatusIdx: index("news_articles_editor_status_idx").on(table.editorStatus),
  categoryIdx: index("news_articles_category_idx").on(table.category),
}));

// ============================================
// Timeline Events
// ============================================

export const timelineEvents = pgTable("timeline_events", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  date: timestamp("date").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // ICC | PHILIPPINE_GOVERNMENT | etc.
  verificationStatus: varchar("verification_status", { length: 30 }).notNull().default("UNVERIFIED"),
  sources: jsonb("sources").$type<string[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  dateIdx: index("timeline_events_date_idx").on(table.date),
  categoryIdx: index("timeline_events_category_idx").on(table.category),
}));

// ============================================
// Documents
// ============================================

export const documents = pgTable("documents", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  title: text("title").notNull(),
  organization: text("organization").notNull(),
  documentType: text("document_type").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  sourceId: text("source_id"),
  category: varchar("category", { length: 50 }).notNull(), // ICC_DOCUMENTS | etc.
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  dateIdx: index("documents_date_idx").on(table.date),
  categoryIdx: index("documents_category_idx").on(table.category),
}));

// ============================================
// Claims
// ============================================

export const claims = pgTable("claims", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  claim: text("claim").notNull(),
  source: text("source").notNull(),
  date: timestamp("date").notNull(),
  evidence: text("evidence"),
  status: varchar("status", { length: 50 }).notNull(), // VERIFIED_FACT | ALLEGATION | etc.
  context: text("context"),
  whatIsVerified: text("what_is_verified"),
  whatIsUncertain: text("what_is_uncertain"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  dateIdx: index("claims_date_idx").on(table.date),
  statusIdx: index("claims_status_idx").on(table.status),
}));

// ============================================
// Sources
// ============================================

export const sources = pgTable("sources", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  organization: text("organization").notNull(),
  url: text("url").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // PRIMARY | SECONDARY
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============================================
// Statements
// ============================================

export const statements = pgTable("statements", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  date: timestamp("date").notNull(),
  speaker: text("speaker").notNull(),
  statement: text("statement").notNull(),
  context: text("context"),
  source: text("source").notNull(),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  dateIdx: index("statements_date_idx").on(table.date),
  speakerIdx: index("statements_speaker_idx").on(table.speaker),
}));

// ============================================
// Users (Admin)
// ============================================

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("EDITOR"), // ADMIN | EDITOR
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ============================================
// Content Edit History (Audit Trail)
// ============================================

export const contentHistory = pgTable("content_history", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  entityType: varchar("entity_type", { length: 50 }).notNull(), // news_article | timeline_event | etc.
  entityId: text("entity_id").notNull(),
  previousContent: jsonb("previous_content").$type<Record<string, any>>(),
  updatedContent: jsonb("updated_content").$type<Record<string, any>>(),
  editorId: text("editor_id").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  entityIdIdx: index("content_history_entity_idx").on(table.entityType, table.entityId),
  createdAtIdx: index("content_history_created_at_idx").on(table.createdAt),
}));
