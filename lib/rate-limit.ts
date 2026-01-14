// Simple in-memory rate limiting
// In production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000
);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = process.env.NODE_ENV === 'development' ? 20 : 5,
  windowMs: number = process.env.NODE_ENV === 'development' ? 1 * 60 * 1000 : 15 * 60 * 1000 // 1 min in dev, 15 min in prod
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    const timeUntilReset = Math.ceil((entry.resetTime - now) / 1000 / 60);
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: `Too many requests. Please try again in ${timeUntilReset} minute(s).`,
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(identifier, entry);

  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

// Get client IP from request
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Fallback to a default identifier (less secure but works)
  return 'unknown';
}

// Clear rate limit store (useful for development/testing)
export function clearRateLimitStore() {
  rateLimitStore.clear();
}

// Clear rate limit for a specific identifier (useful for development/testing)
export function clearRateLimitForIdentifier(identifier: string) {
  rateLimitStore.delete(identifier);
}
