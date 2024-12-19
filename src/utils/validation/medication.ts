import { Medication } from '../../types/medication';

export function validateDosage(dosage: string): boolean {
  const re = /^\d+(\.\d+)?mg$/;
  return re.test(dosage);
}

export function validateVolume(volume: string): boolean {
  const re = /^\d+(\.\d+)?ml$/;
  return re.test(volume);
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