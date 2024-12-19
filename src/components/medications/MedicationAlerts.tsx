import React from 'react';
import type { MedicationAlert as AlertType } from '../../types/medication';
import { MedicationAlert } from './MedicationAlert';

interface MedicationAlertsProps {
  alerts: AlertType[];
  onDismiss?: (alertId: string) => void;
}

export function MedicationAlerts({ alerts, onDismiss }: MedicationAlertsProps) {
  const activeAlerts = alerts.filter(alert => alert.status === 'active');

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Alerts</h3>
      <div className="space-y-2">
        {activeAlerts.map(alert => (
          <MedicationAlert
            key={alert.id}
            alert={alert}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    </div>
  );
}