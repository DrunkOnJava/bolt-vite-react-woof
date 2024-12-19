import React from 'react';
import { Beaker } from 'lucide-react';
import type { Medication } from '../../../types/medication';

interface VolumeInfoProps {
  medication: Medication;
}

export function VolumeInfo({ medication }: VolumeInfoProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Volume Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Beaker className="h-4 w-4 mr-1" />
              <span>Weekly</span>
            </div>
            <span className="text-lg font-medium">{medication.weeklyVolume}</span>
          </div>
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Beaker className="h-4 w-4 mr-1" />
              <span>Monthly</span>
            </div>
            <span className="text-lg font-medium">{medication.monthlyVolume}</span>
          </div>
        </div>
      </div>
    </div>
  );
}