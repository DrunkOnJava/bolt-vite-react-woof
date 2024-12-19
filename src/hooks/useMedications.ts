import { useState, useCallback, useEffect } from 'react';
import type { Medication, MedicationPickup, MedicationAlert } from '../types/medication';
import { useNotifications } from '../context/NotificationContext';
import { INITIAL_MEDICATIONS } from '../data/medications';

export function useMedications(patientId: string) {
  const [medications, setMedications] = useState<Medication[]>(
    INITIAL_MEDICATIONS[patientId] || []
  );
  const [pickups, setPickups] = useState<MedicationPickup[]>([]);
  const [alerts, setAlerts] = useState<MedicationAlert[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Generate alerts for overdue medications
    const newAlerts = medications
      .filter(med => med.daysUntilFill < 0)
      .map(med => ({
        id: `${patientId}-${med.id}-overdue-${Date.now()}`, // Ensure unique IDs
        type: 'overdue' as const,
        patientId,
        medicationId: med.id,
        date: new Date().toISOString(),
        message: `${med.name} refill overdue by ${Math.abs(med.daysUntilFill)} days`,
        status: 'active' as const,
      }));

    // Clear existing alerts and set new ones
    setAlerts(newAlerts);
  }, [medications, patientId]);

  const recordPickup = useCallback((data: {
    medicationId: string;
    pickupDate: string;
    quantity: number;
    notes?: string;
  }) => {
    const pickup: MedicationPickup = {
      id: `${patientId}-pickup-${Date.now()}`,
      patientId,
      ...data,
      nextPickupDate: new Date(new Date(data.pickupDate).getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
    };

    setPickups(prev => [...prev, pickup]);
    addNotification('success', 'Pickup recorded successfully');

    return pickup;
  }, [patientId, addNotification]);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  return {
    medications,
    pickups,
    alerts,
    recordPickup,
    dismissAlert,
  };
}