export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: unknown): string {
  console.error('Auth error:', error);

  if (error instanceof AuthError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Handle Supabase specific errors
    if ('code' in error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return 'Invalid email address';
        case 'auth/user-disabled':
          return 'This account has been disabled';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return 'Invalid email or password';
        default:
          return 'An authentication error occurred';
      }
    }
    return error.message;
  }

  return 'An unexpected error occurred';
}