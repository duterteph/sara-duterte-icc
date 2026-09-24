// Core types for the Sara Duterte & ICC Information Website

// ============================================
// Source Types
// ============================================

export type SourceType = "PRIMARY" | "SECONDARY";

export type VerificationStatus =
  | "UNVERIFIED"
  | "SOURCE_CONFIRMED"
  | "MULTIPLE_SOURCES"
  | "DISPUTED";

export type EditorStatus = "PENDING" | "APPROVED" | "REJECTED";

// ============================================
// News Articles
// ============================================

export interface NewsArticle {
  id: string;
  title: string;
  originalTitle?: string;
  url: string;
  sourceName: string;
  sourceType: SourceType;
  author?: string;
  publishedAt: string;
  discoveredAt: string;
  imageUrl?: string;
  excerpt?: string;
  summary: string;
  category: string;
  tags: string[];
  language: string;
  contentHash: string;
  verificationStatus: VerificationStatus;
  editorStatus: EditorStatus;
  aiProcessed: boolean;
  humanReviewed: boolean;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticleInput {
  title: string;
  originalTitle?: string;
  url: string;
  sourceName: string;
  sourceType: SourceType;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  excerpt?: string;
  summary: string;
  category: string;
  tags: string[];
  language?: string;
  contentHash: string;
}

// ============================================
// Timeline Events
// ============================================

export type TimelineCategory =
  | "ICC"
  | "PHILIPPINE_GOVERNMENT"
  | "SARA_DUTERTE"
  | "LEGAL_PROCEEDINGS"
  | "PUBLIC_STATEMENTS"
  | "INTERNATIONAL_DEVELOPMENTS";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: TimelineCategory;
  verificationStatus: VerificationStatus;
  sources: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEventInput {
  date: string;
  title: string;
  description: string;
  category: TimelineCategory;
  sources: string[];
}

// ============================================
// Documents
// ============================================

export type DocumentCategory =
  | "ICC_DOCUMENTS"
  | "PHILIPPINE_GOVERNMENT"
  | "COURT_DOCUMENTS"
  | "OFFICIAL_STATEMENTS"
  | "LAWS_TREATIES"
  | "INTERNATIONAL_DOCUMENTS"
  | "NEWS_REPORTS";

export interface Document {
  id: string;
  title: string;
  organization: string;
  documentType: string;
  date: string;
  description: string;
  url: string;
  sourceId?: string;
  category: DocumentCategory;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentInput {
  title: string;
  organization: string;
  documentType: string;
  date: string;
  description: string;
  url: string;
  sourceId?: string;
  category: DocumentCategory;
}

// ============================================
// Claims
// ============================================

export type ClaimStatus =
  | "VERIFIED_FACT"
  | "OFFICIAL_STATEMENT"
  | "ALLEGATION"
  | "DISPUTED_CLAIM"
  | "CONTEXT_NEEDED"
  | "NOT_INDEPENDENTLY_VERIFIED";

export interface Claim {
  id: string;
  claim: string;
  source: string;
  date: string;
  evidence?: string;
  status: ClaimStatus;
  context?: string;
  whatIsVerified?: string;
  whatIsUncertain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimInput {
  claim: string;
  source: string;
  date: string;
  evidence?: string;
  status: ClaimStatus;
  context?: string;
  whatIsVerified?: string;
  whatIsUncertain?: string;
}

// ============================================
// Sources
// ============================================

export interface Source {
  id: string;
  name: string;
  organization: string;
  url: string;
  type: SourceType;
  description?: string;
  createdAt: string;
}

export interface SourceInput {
  name: string;
  organization: string;
  url: string;
  type: SourceType;
  description?: string;
}

// ============================================
// Statements
// ============================================

export interface Statement {
  id: string;
  date: string;
  speaker: string;
  statement: string;
  context?: string;
  source: string;
  sourceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatementInput {
  date: string;
  speaker: string;
  statement: string;
  context?: string;
  source: string;
  sourceUrl?: string;
}

// ============================================
// User & Authentication
// ============================================

export type UserRole = "ADMIN" | "EDITOR";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// Search & Filter Types
// ============================================

export interface SearchFilters {
  query?: string;
  category?: string;
  sourceType?: SourceType;
  verificationStatus?: VerificationStatus;
  editorStatus?: EditorStatus;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface TimelineFilters {
  year?: number;
  category?: TimelineCategory;
  sourceType?: SourceType;
}

// ============================================
// n8n Webhook Types
// ============================================

export interface N8nNewsWebhookPayload {
  title: string;
  originalTitle?: string;
  url: string;
  sourceName: string;
  sourceType: SourceType;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  excerpt?: string;
  summary: string;
  category: string;
  tags: string[];
  language?: string;
  contentHash: string;
  keyFacts?: string[];
  claims?: string[];
  uncertainties?: string[];
  people?: string[];
  organizations?: string[];
  topics?: string[];
}

export interface N8nWebhookResponse {
  success: boolean;
  articleId?: string;
  message?: string;
  error?: string;
}
