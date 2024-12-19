import { PASSWORD_REQUIREMENTS } from './constants';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`;
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (PASSWORD_REQUIREMENTS.requireNumber && !/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  if (PASSWORD_REQUIREMENTS.requireSpecial && !/[^A-Za-z0-9]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
}

export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;

  if (password.length >= PASSWORD_REQUIREMENTS.minLength) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}