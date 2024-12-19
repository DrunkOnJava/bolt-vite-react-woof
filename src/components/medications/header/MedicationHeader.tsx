import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import type { Medication } from '../../../types/medication';

interface MedicationHeaderProps {
  medication: Medication;
}

export function MedicationHeader({ medication }: MedicationHeaderProps) {
  const isOverdue = medication.daysUntilFill < 0;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          isOverdue ? 'bg-red-50' : 'bg-blue-50'
        }`}>
          <Calendar className={`h-6 w-6 ${
            isOverdue ? 'text-red-500' : 'text-blue-500'
          }`} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900">{medication.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              medication.tier === 'Tier 1' ? 'bg-blue-100 text-blue-800' :
              medication.tier === 'Tier 2' ? 'bg-purple-100 text-purple-800' :
              'bg-indigo-100 text-indigo-800'
            }`}>
              {medication.tier}
            </span>
          </div>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-sm text-gray-500">Contact: {medication.contactInfo}</p>
            <span className="text-sm font-medium text-gray-900">{medication.price}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}