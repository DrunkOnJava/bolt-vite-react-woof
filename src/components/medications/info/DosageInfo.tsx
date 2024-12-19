import React from 'react';
import { Droplet } from 'lucide-react';
import type { Medication } from '../../../types/medication';

interface DosageInfoProps {
  medication: Medication;
}

export function DosageInfo({ medication }: DosageInfoProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Dosage</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplet className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-lg font-medium">{medication.weeklyDosage}</span>
          </div>
          <span className="text-sm text-gray-500">
            Volume: {medication.weeklyVolume}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Monthly Dosage</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplet className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-lg font-medium">{medication.monthlyDosage}</span>
          </div>
          <span className="text-sm text-gray-500">
            Volume: {medication.monthlyVolume}
          </span>
        </div>
      </div>
    </div>
  );
}