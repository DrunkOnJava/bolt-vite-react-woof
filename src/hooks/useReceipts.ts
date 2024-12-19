import { useState, useCallback } from 'react';
import { Receipt, ReceiptFilters } from '../types/receipt';
import { useNotifications } from '../context/NotificationContext';
import { useMedications } from './useMedications';

export function useReceipts(patientId: string) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const { addNotification } = useNotifications();
  const { medications } = useMedications(patientId);

  const generateReceipt = useCallback((medicationId: string) => {
    const medication = medications.find(m => m.id === medicationId);
    if (!medication) return;

    const nextRefillDate = new Date();
    nextRefillDate.setDate(nextRefillDate.getDate() + 28);

    const newReceipt: Receipt = {
      id: `receipt-${Date.now()}`,
      patientId,
      transactionDate: new Date().toISOString(),
      amount: parseFloat(medication.price.replace('$', '')),
      description: `${medication.name} - ${medication.weeklyDosage} weekly dose`,
      type: 'auto-generated',
      status: 'completed',
      paymentMethod: 'credit',
      medication: {
        name: medication.name,
        dosage: medication.weeklyDosage,
        nextRefillDate: nextRefillDate.toISOString(),
      },
    };

    setReceipts(prev => [newReceipt, ...prev]);
    addNotification('success', 'Receipt generated successfully');
    return newReceipt;
  }, [medications, patientId, addNotification]);

  const uploadReceipt = useCallback(async (file: File, metadata: Partial<Receipt>) => {
    try {
      // In a real app, this would upload to a secure storage service
      const documentUrl = URL.createObjectURL(file);
      
      const newReceipt: Receipt = {
        id: `receipt-${Date.now()}`,
        patientId,
        transactionDate: new Date().toISOString(),
        type: 'manual',
        status: 'completed',
        documentUrl,
        ...metadata,
      } as Receipt;

      setReceipts(prev => [newReceipt, ...prev]);
      addNotification('success', 'Receipt uploaded successfully');
    } catch (error) {
      addNotification('error', 'Failed to upload receipt');
      throw error;
    }
  }, [patientId, addNotification]);

  const filterReceipts = useCallback((filters: ReceiptFilters) => {
    return receipts.filter(receipt => {
      if (filters.dateRange) {
        const date = new Date(receipt.transactionDate);
        const start = new Date(filters.dateRange.start);
        const end = new Date(filters.dateRange.end);
        if (date < start || date > end) return false;
      }
      if (filters.paymentMethod && receipt.paymentMethod !== filters.paymentMethod) {
        return false;
      }
      if (filters.type && receipt.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [receipts]);

  return {
    receipts,
    generateReceipt,
    uploadReceipt,
    filterReceipts,
  };
}