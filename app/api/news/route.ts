import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { desc, eq, and, or, like, gte, lte } from "drizzle-orm";
import { paginationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/news
 *
 * Fetch published news articles with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse pagination
    const paginationResult = paginationSchema.safeParse({
      page: searchParams.get("page") || "1",
      pageSize: searchParams.get("pageSize") || "20",
    });

    if (!paginationResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const { page, pageSize } = paginationResult.data;
    const offset = (page - 1) * pageSize;

    // Build filters
    const filters = [];

    // Only show published articles to public
    filters.push(eq(newsArticles.published, true));

    // Category filter
    const category = searchParams.get("category");
    if (category && category !== "all") {
      filters.push(eq(newsArticles.category, category));
    }

    // Source type filter
    const sourceType = searchParams.get("sourceType");
    if (sourceType && (sourceType === "PRIMARY" || sourceType === "SECONDARY")) {
      filters.push(eq(newsArticles.sourceType, sourceType));
    }

    // Date range filters
    const startDate = searchParams.get("startDate");
    if (startDate) {
      filters.push(gte(newsArticles.publishedAt, new Date(startDate)));
    }

    const endDate = searchParams.get("endDate");
    if (endDate) {
      filters.push(lte(newsArticles.publishedAt, new Date(endDate)));
    }

    // Search query
    const query = searchParams.get("query");
    if (query) {
      filters.push(
        or(
          like(newsArticles.title, `%${query}%`),
          like(newsArticles.summary, `%${query}%`)
        )!
      );
    }

    // Execute query
    const articles = await db
      .select({
        id: newsArticles.id,
        title: newsArticles.title,
        url: newsArticles.url,
        sourceName: newsArticles.sourceName,
        sourceType: newsArticles.sourceType,
        publishedAt: newsArticles.publishedAt,
        imageUrl: newsArticles.imageUrl,
        excerpt: newsArticles.excerpt,
        summary: newsArticles.summary,
        category: newsArticles.category,
        tags: newsArticles.tags,
        verificationStatus: newsArticles.verificationStatus,
      })
      .from(newsArticles)
      .where(and(...filters))
      .orderBy(desc(newsArticles.publishedAt))
      .limit(pageSize)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: newsArticles.id })
      .from(newsArticles)
      .where(and(...filters));

    const totalCount = Number(count) || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      success: true,
      data: {
        items: articles,
        total: totalCount,
        page,
        pageSize,
        totalPages,
      },
    });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}