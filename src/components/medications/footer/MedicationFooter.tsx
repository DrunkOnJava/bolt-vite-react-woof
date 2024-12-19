import React from 'react';
import { Clock } from 'lucide-react';
import type { Medication } from '../../../types/medication';
import { MedicationStatusBadge } from '../MedicationStatusBadge';

interface MedicationFooterProps {
  medication: Medication;
  onRecordPickup?: () => void;
}

export function MedicationFooter({ medication, onRecordPickup }: MedicationFooterProps) {
  const isOverdue = medication.daysUntilFill < 0;

  return (
    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            Next refill: {medication.refillDue}
          </span>
        </div>
        {isOverdue && (
          <span className="text-sm text-red-600 font-medium">
            ({Math.abs(medication.daysUntilFill)} days overdue)
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <MedicationStatusBadge
          status={medication.status}
          isOverdue={isOverdue}
          daysUntilFill={medication.daysUntilFill}
        />
        {onRecordPickup && (
          <button
            onClick={onRecordPickup}
            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Record Pickup
          </button>
        )}
      </div>
    </div>
  );
}