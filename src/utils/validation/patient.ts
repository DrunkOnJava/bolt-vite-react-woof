import { Patient } from '../../types/patient';

export function validateEmail(email: string): boolean {
  if (!email) return true; // Allow empty email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true; // Allow empty phone
  const re = /^\+?[\d\s-()]{10,}$/;
  return re.test(phone);
}

export function validatePatientInfo(data: Partial<Patient>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  return errors;
}