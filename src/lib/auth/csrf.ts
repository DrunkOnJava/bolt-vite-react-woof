import { v4 as uuidv4 } from 'uuid';

const CSRF_TOKEN_KEY = 'csrf_token';

export function generateCsrfToken(): string {
  const token = uuidv4();
  sessionStorage.setItem(CSRF_TOKEN_KEY, token);
  return token;
}

export function validateCsrfToken(token: string): boolean {
  const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
  if (!storedToken || token !== storedToken) {
    return false;
  }
  // Rotate token after validation
  sessionStorage.removeItem(CSRF_TOKEN_KEY);
  return true;
}

export function getCsrfToken(): string | null {
  return sessionStorage.getItem(CSRF_TOKEN_KEY);
}