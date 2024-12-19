import { Patient } from './patient';

export interface Medication {
  id: string;
  name: string;
  weeklyDosage: string;
  monthlyDosage: string;
  weeklyVolume: string;
  monthlyVolume: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  price: string;
  contactInfo: string;
  refillDue: string;
  lastFillDate: string;
  daysUntilFill: number;
  status: 'active' | 'discontinued' | 'completed';
}

export interface MedicationPickup {
  id: string;
  medicationId: string;
  patientId: string;
  pickupDate: string;
  nextPickupDate: string;
  quantity: number;
  notes?: string;
  status: 'completed' | 'missed' | 'scheduled';
}

export interface MedicationAlert {
  id: string;
  type: 'upcoming_pickup' | 'overdue' | 'refill_needed';
  patientId: string;
  medicationId: string;
  date: string;
  message: string;
  status: 'active' | 'resolved';
}