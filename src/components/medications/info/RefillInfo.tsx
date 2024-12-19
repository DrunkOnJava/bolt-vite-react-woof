import React from 'react';
import { Calendar } from 'lucide-react';
import type { Medication } from '../../../types/medication';

interface RefillInfoProps {
  medication: Medication;
}

export function RefillInfo({ medication }: RefillInfoProps) {
  const isOverdue = medication.daysUntilFill < 0;

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Last Fill Date</h4>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-lg font-medium">{medication.lastFillDate}</span>
        </div>
      </div>

      <div className={`rounded-lg p-4 ${
        isOverdue ? 'bg-red-50' : 'bg-gray-50'
      }`}>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Next Refill Due</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className={`h-5 w-5 mr-2 ${
              isOverdue ? 'text-red-400' : 'text-gray-400'
            }`} />
            <span className={`text-lg font-medium ${
              isOverdue ? 'text-red-600' : ''
            }`}>
              {medication.refillDue}
            </span>
          </div>
          {isOverdue && (
            <span className="text-sm text-red-600 font-medium">
              {Math.abs(medication.daysUntilFill)} days overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
}