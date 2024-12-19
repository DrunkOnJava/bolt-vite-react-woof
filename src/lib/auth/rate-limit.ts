interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, { attempts: 1, lastAttempt: now });
    return true;
  }

  if (now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(identifier, { attempts: 1, lastAttempt: now });
    return true;
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    return false;
  }

  entry.attempts += 1;
  entry.lastAttempt = now;
  rateLimitStore.set(identifier, entry);
  return true;
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}