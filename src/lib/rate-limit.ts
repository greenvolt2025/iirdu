/**
 * Simple in-memory rate limiter for API routes
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((entry, key) => {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

interface RateLimitConfig {
  /** Max requests per window */
  limit: number;
  /** Window size in seconds */
  windowSeconds: number;
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 10, windowSeconds: 60 },
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = identifier;
  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowSeconds * 1000,
    });
    return { success: true, remaining: config.limit - 1, resetIn: config.windowSeconds };
  }

  if (entry.count >= config.limit) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);
    return { success: false, remaining: 0, resetIn };
  }

  entry.count++;
  return {
    success: true,
    remaining: config.limit - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}
