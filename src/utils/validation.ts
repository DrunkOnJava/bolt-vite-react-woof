import { Patient } from '../types/patient';
import { Medication } from '../types/medication';

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

export function validateDosage(dosage: string): boolean {
  // Format should be number followed by unit (e.g., "0.5mg", "2.7mg")
  const re = /^\d+(\.\d+)?mg$/;
  return re.test(dosage);
}

export function validateVolume(volume: string): boolean {
  // Format should be number followed by unit (e.g., "0.2ml", "1.08ml")
  const re = /^\d+(\.\d+)?ml$/;
  return re.test(volume);
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

export function validateMedicationInfo(data: Partial<Medication>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.weeklyDosage && !validateDosage(data.weeklyDosage)) {
    errors.weeklyDosage = 'Invalid dosage format (e.g., "0.5mg")';
  }

  if (data.monthlyDosage && !validateDosage(data.monthlyDosage)) {
    errors.monthlyDosage = 'Invalid dosage format (e.g., "2mg")';
  }

  if (data.weeklyVolume && !validateVolume(data.weeklyVolume)) {
    errors.weeklyVolume = 'Invalid volume format (e.g., "0.2ml")';
  }

  if (data.monthlyVolume && !validateVolume(data.monthlyVolume)) {
    errors.monthlyVolume = 'Invalid volume format (e.g., "0.8ml")';
  }

  if (data.price && !/^\$?\d+(\.\d{2})?$|^Free$/.test(data.price)) {
    errors.price = 'Invalid price format (e.g., "$200.00" or "Free")';
  }

  return errors;
}

export function sanitizePatientData(data: Partial<Patient>): Partial<Patient> {
  return {
    ...data,
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    email: data.email?.trim().toLowerCase(),
    phone: data.phone?.trim().replace(/\s+/g, ''),
    notes: data.notes?.trim()
  };
}

export function sanitizeMedicationData(data: Partial<Medication>): Partial<Medication> {
  return {
    ...data,
    weeklyDosage: data.weeklyDosage?.trim().toLowerCase(),
    monthlyDosage: data.monthlyDosage?.trim().toLowerCase(),
    weeklyVolume: data.weeklyVolume?.trim().toLowerCase(),
    monthlyVolume: data.monthlyVolume?.trim().toLowerCase(),
    price: data.price?.trim(),
    contactInfo: data.contactInfo?.trim()
  };
}