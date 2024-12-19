import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import type { MedicationAlert as AlertType } from '../../types/medication';
import { formatDate } from '../../utils/date';

interface MedicationAlertProps {
  alert: AlertType;
  onDismiss?: (alertId: string) => void;
}

export function MedicationAlert({ alert, onDismiss }: MedicationAlertProps) {
  const getAlertStyles = () => {
    switch (alert.type) {
      case 'overdue':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          icon: <AlertCircle className="h-5 w-5 text-red-400" />,
        };
      case 'upcoming_pickup':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: <Clock className="h-5 w-5 text-yellow-400" />,
        };
      case 'refill_needed':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          icon: <AlertCircle className="h-5 w-5 text-blue-400" />,
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-800',
          icon: <AlertCircle className="h-5 w-5 text-gray-400" />,
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`${styles.bg} p-4 rounded-lg`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${styles.text}`}>
            {alert.message}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Date: {formatDate(alert.date)}
          </p>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={() => onDismiss(alert.id)}
              className="inline-flex text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Dismiss</span>
              <AlertCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}