import { NextResponse } from 'next/server';

import { processAIQuery } from '@/lib/ai/aiEngine';

// Rate limiting map for assistant queries
const assistantRateLimitMap = new Map<string, number[]>();
const ASSISTANT_WINDOW_MS = 60 * 1000;
const MAX_ASSISTANT_REQUESTS = 15;

function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const timestamps = assistantRateLimitMap.get(clientIp) || [];
    const validTimestamps = timestamps.filter((t) => now - t < ASSISTANT_WINDOW_MS);

    if (validTimestamps.length >= MAX_ASSISTANT_REQUESTS) {
      return NextResponse.json(
        {
          success: false,
          response: 'Rate limit reached. Please wait a moment before sending another query.',
        },
        { status: 429 }
      );
    }

    validTimestamps.push(now);
    assistantRateLimitMap.set(clientIp, validTimestamps);

    const body = await request.json();
    const { query, language = 'en', history } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, response: 'Please ask a question regarding Tattva Web Solutions services or products.' },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { success: false, response: 'Query length exceeds maximum limit of 500 characters.' },
        { status: 400 }
      );
    }

    const cleanQuery = sanitizeInput(query);
    const validLanguage = language === 'mr' ? 'mr' : 'en';

    const result = await processAIQuery({
      query: cleanQuery,
      language: validLanguage,
      history: Array.isArray(history) ? history : undefined,
    });

    return NextResponse.json({
      success: true,
      query: cleanQuery,
      language: result.language,
      response: result.response,
      source: result.source,
      suggestedActions: result.suggestedActions || [
        { label: 'Explore Services', href: '/services' },
        { label: 'Contact Team', href: '/contact' },
      ],
    });
  } catch {
    return NextResponse.json(
      { success: false, response: 'Sorry, I encountered an issue processing your query.' },
      { status: 500 }
    );
  }
}
