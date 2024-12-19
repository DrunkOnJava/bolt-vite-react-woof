import { AuthSession } from '../../types/auth';
import { AUTH_STORAGE_KEYS } from './constants';

export function saveSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEYS.SESSION, JSON.stringify(session));
  if (session.refreshToken) {
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, session.refreshToken);
  }
}

export function getSession(): AuthSession | null {
  const sessionStr = localStorage.getItem(AUTH_STORAGE_KEYS.SESSION);
  return sessionStr ? JSON.parse(sessionStr) : null;
}

export function clearSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEYS.SESSION);
  localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
}

export function isSessionValid(session: AuthSession | null): boolean {
  if (!session || !session.accessToken) return false;
  
  try {
    // In a real app, you'd verify the token's expiration
    // For now, we'll just check if it exists
    return true;
  } catch {
    return false;
  }
}