import { AuthError } from '../types/auth';

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}

export function handleAuthError(error: unknown): AuthError {
  console.error('Auth error:', error);
  
  if (error instanceof Error) {
    return {
      message: error.message,
      status: error instanceof Response ? error.status : undefined,
    };
  }
  
  return {
    message: 'An unexpected authentication error occurred',
  };
}