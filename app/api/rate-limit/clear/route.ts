import { NextResponse } from 'next/server';
import { clearRateLimitStore, clearRateLimitForIdentifier } from '@/lib/rate-limit';

// Only allow in development
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { identifier } = body;

    if (identifier) {
      clearRateLimitForIdentifier(identifier);
      return NextResponse.json({
        success: true,
        message: `Rate limit cleared for identifier: ${identifier}`,
      });
    } else {
      clearRateLimitStore();
      return NextResponse.json({
        success: true,
        message: 'All rate limits cleared',
      });
    }
  } catch (error) {
    console.error('Error clearing rate limit:', error);
    return NextResponse.json(
      { error: 'Failed to clear rate limit' },
      { status: 500 }
    );
  }
}
