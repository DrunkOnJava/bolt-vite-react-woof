import bcrypt from 'bcryptjs';
import DOMPurify from 'dompurify';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [], // Strip all attributes
  });
}

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function validateAndSanitizeEmail(email: string): string {
  const sanitized = sanitizeInput(email.toLowerCase().trim());
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  return sanitized;
}