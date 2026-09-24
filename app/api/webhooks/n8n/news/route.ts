import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { n8nWebhookPayloadSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * n8n Webhook Endpoint
 *
 * This endpoint receives news articles from n8n automation workflows.
 * All articles are marked as PENDING and require human approval before publication.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.N8N_WEBHOOK_SECRET;

    if (!authHeader || !expectedToken) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    if (token !== expectedToken) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = n8nWebhookPayloadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payload",
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const payload = validationResult.data;

    // Check for duplicate by URL
    const existingArticle = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.url, payload.url))
      .limit(1);

    if (existingArticle.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate article",
          message: "An article with this URL already exists",
        },
        { status: 409 }
      );
    }

    // Insert article as PENDING
    const [newArticle] = await db
      .insert(newsArticles)
      .values({
        title: payload.title,
        originalTitle: payload.originalTitle,
        url: payload.url,
        sourceName: payload.sourceName,
        sourceType: payload.sourceType,
        author: payload.author,
        publishedAt: new Date(payload.publishedAt),
        discoveredAt: new Date(),
        imageUrl: payload.imageUrl,
        excerpt: payload.excerpt,
        summary: payload.summary,
        category: payload.category,
        tags: payload.tags,
        language: payload.language || "en",
        contentHash: payload.contentHash,
        verificationStatus: "UNVERIFIED",
        editorStatus: "PENDING",
        aiProcessed: true,
        humanReviewed: false,
        published: false,
      })
      .returning({ id: newsArticles.id });

    return NextResponse.json({
      success: true,
      articleId: newArticle.id,
      message: "Article received and awaiting human review",
    });
  } catch (error) {
    console.error("n8n webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}