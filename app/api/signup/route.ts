import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/lib/validations';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { createApiClient } from '@/lib/supabase/api';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (more permissive in development)
    const identifier = getClientIdentifier(request);
    const rateLimit = checkRateLimit(identifier); // Uses environment-based defaults

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

    // Detect language from request headers
    const acceptLanguage = request.headers.get('accept-language') || '';
    const language = acceptLanguage.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';

    // Get client info for analytics
    const ipAddress = getClientIdentifier(request);
    const userAgent = request.headers.get('user-agent') || '';

    // Save to Supabase (using API client without cookies)
    const supabase = createApiClient();

    const { data: signupData, error: dbError } = await supabase
      .from('newsletter_signups')
      .insert({
        email,
        name,
        language,
        ip_address: ipAddress,
        user_agent: userAgent,
        source: 'website',
      })
      .select()
      .single();

    if (dbError) {
      // Check if it's a duplicate email error
      if (dbError.code === '23505') {
        // Unique constraint violation (duplicate email)
        return NextResponse.json(
          {
            success: true,
            message: 'You are already signed up!',
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
      }

      console.error('Database error:', dbError);
      return NextResponse.json(
        {
          error: 'Failed to save signup. Please try again later.',
        },
        { status: 500 }
      );
    }

    console.log('New signup saved:', { id: signupData.id, email, name, timestamp: new Date().toISOString() });

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
