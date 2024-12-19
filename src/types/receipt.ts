import { Medication } from './medication';

export interface Receipt {
  id: string;
  patientId: string;
  transactionDate: string;
  amount: number;
  description: string;
  type: 'auto-generated' | 'manual';
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'credit' | 'debit' | 'cash' | 'insurance';
  medication: {
    name: string;
    dosage: string;
    nextRefillDate: string;
  };
  documentUrl?: string;
}

export interface ReceiptFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  paymentMethod?: string;
  type?: string;
}