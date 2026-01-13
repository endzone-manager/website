import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/lib/validations';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimit = checkRateLimit(identifier, 5, 15 * 60 * 1000); // 5 requests per 15 minutes

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: rateLimit.message || 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check honey pot first - if filled, it's a bot (silently fail)
    if (body.website && body.website.trim().length > 0) {
      // Bot detected - return success to avoid revealing the honey pot
      return NextResponse.json(
        { success: true, message: 'Thank you for your interest!' },
        { status: 200 }
      );
    }

    // Validate with Zod
    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email } = validationResult.data;

    // TODO: Save to database or send to email service
    // Example:
    // await saveToDatabase({ name, email });
    // await sendWelcomeEmail(email, name);

    console.log('New signup:', { name, email, timestamp: new Date().toISOString() });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully signed up!',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
