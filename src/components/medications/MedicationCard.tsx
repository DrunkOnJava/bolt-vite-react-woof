import React from 'react';
import type { Medication } from '../../types/medication';
import { MedicationHeader } from './header/MedicationHeader';
import { DosageInfo } from './info/DosageInfo';
import { VolumeInfo } from './info/VolumeInfo';
import { RefillInfo } from './info/RefillInfo';
import { MedicationFooter } from './footer/MedicationFooter';

interface MedicationCardProps {
  medication: Medication;
  onRecordPickup?: () => void;
}

export function MedicationCard({ medication, onRecordPickup }: MedicationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <MedicationHeader medication={medication} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DosageInfo medication={medication} />
          <VolumeInfo medication={medication} />
          <RefillInfo medication={medication} />
        </div>
      </div>

      <MedicationFooter 
        medication={medication}
        onRecordPickup={onRecordPickup}
      />
    </div>
  );
}