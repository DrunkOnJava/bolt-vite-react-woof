export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email already in use',
  WEAK_PASSWORD: 'Password is too weak',
  GOOGLE_AUTH_FAILED: 'Google authentication failed',
  SESSION_EXPIRED: 'Session expired, please login again',
} as const;

export const AUTH_STORAGE_KEYS = {
  SESSION: 'auth_session',
  REFRESH_TOKEN: 'auth_refresh_token',
} as const;

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
} as const;