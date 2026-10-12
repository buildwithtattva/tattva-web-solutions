import { NextResponse } from 'next/server';

// Simple in-memory rate limiting map (IP / Token -> timestamp array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(request: Request) {
  try {
    // Rate Limiting check
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const timestamps = rateLimitMap.get(clientIp) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    validTimestamps.push(now);
    rateLimitMap.set(clientIp, validTimestamps);

    const body = await request.json();
    const { name, email, subject, message, website_hp } = body;

    // Honeypot spam check - if honeypot field is filled by bot, silently reject
    if (website_hp && website_hp.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Spam submission detected.' },
        { status: 400 }
      );
    }

    // Type and existence checks
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name (2 to 100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3 || subject.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid subject line (3 to 150 characters).' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message with 10 to 3000 characters detailing your inquiry.' },
        { status: 400 }
      );
    }

    // Sanitize values
    const cleanName = sanitizeInput(name);

    // Generate reference code
    const referenceId = `TATTVA-INQ-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: `Thank you ${cleanName}! Your inquiry has been logged successfully with Reference ID: ${referenceId}. Our engineering team will get back to you within 24 hours.`,
      referenceId,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
