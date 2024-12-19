import { Medication, MedicationPickup } from '../types/medication';

export function calculateNextPickupDate(pickupDate: Date | string): Date {
  const date = new Date(pickupDate);
  date.setDate(date.getDate() + 28); // 4-week cycle
  return date;
}

export function calculateDaysUntilFill(refillDue: string): number {
  const today = new Date();
  const [month, day] = refillDue.split('/').map(num => parseInt(num));
  const dueDate = new Date(today.getFullYear(), month - 1, day);
  
  // If the date has passed for this year, try next year
  if (dueDate < today) {
    dueDate.setFullYear(dueDate.getFullYear() + 1);
  }
  
  const diffTime = dueDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateMonthlyValues(weeklyValues: {
  dosage: string;
  volume: string;
}): { monthlyDosage: string; monthlyVolume: string } {
  const dosageMatch = weeklyValues.dosage.match(/^(\d+(\.\d+)?)mg$/);
  const volumeMatch = weeklyValues.volume.match(/^(\d+(\.\d+)?)ml$/);

  if (!dosageMatch || !volumeMatch) {
    throw new Error('Invalid dosage or volume format');
  }

  const weeklyDosage = parseFloat(dosageMatch[1]);
  const weeklyVolume = parseFloat(volumeMatch[1]);

  return {
    monthlyDosage: `${(weeklyDosage * 4).toFixed(2)}mg`,
    monthlyVolume: `${(weeklyVolume * 4).toFixed(2)}ml`
  };
}

export function getLastPickup(pickups: MedicationPickup[], medicationId: string): MedicationPickup | undefined {
  return pickups
    .filter(p => p.medicationId === medicationId)
    .sort((a, b) => new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime())[0];
}

export function getMedicationStatus(medication: Medication): {
  isOverdue: boolean;
  daysUntilNextPickup: number;
  status: 'active' | 'warning' | 'overdue';
} {
  const daysUntilFill = calculateDaysUntilFill(medication.refillDue);
  
  return {
    isOverdue: daysUntilFill < 0,
    daysUntilNextPickup: daysUntilFill,
    status: daysUntilFill < 0 ? 'overdue' :
           daysUntilFill <= 7 ? 'warning' : 'active'
  };
}

export function validateMedicationCalculations(medication: Medication): boolean {
  try {
    const calculated = calculateMonthlyValues({
      dosage: medication.weeklyDosage,
      volume: medication.weeklyVolume
    });

    return calculated.monthlyDosage === medication.monthlyDosage &&
           calculated.monthlyVolume === medication.monthlyVolume;
  } catch {
    return false;
  }
}