import React, { useState } from 'react';
import { Pill, Clock } from 'lucide-react';
import type { Medication, MedicationPickup } from '../../types/medication';
import { Button } from '../ui/Button';
import { MedicationDetails } from './MedicationDetails';
import { MedicationHistory } from './MedicationHistory';
import { RecordPickupModal } from './RecordPickupModal';
import { getLastPickup, getMedicationStatus } from '../../utils/medication';

interface MedicationListProps {
  medications: Medication[];
  pickups?: MedicationPickup[];
  onRecordPickup?: (data: {
    medicationId: string;
    pickupDate: string;
    quantity: number;
    notes?: string;
  }) => void;
}

export function MedicationList({ 
  medications, 
  pickups = [], 
  onRecordPickup 
}: MedicationListProps) {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const getMedicationPickups = (medicationId: string) => {
    return pickups.filter(pickup => pickup.medicationId === medicationId);
  };

  if (medications.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No medications</h3>
        <p className="text-gray-500">No medications have been prescribed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {medications.map(medication => {
        const medicationPickups = getMedicationPickups(medication.id);
        const lastPickup = getLastPickup(medicationPickups, medication.id);
        const status = getMedicationStatus(medication);

        return (
          <div 
            key={medication.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <MedicationDetails
                medication={medication}
                lastPickupDate={lastPickup?.pickupDate}
                nextPickupDate={lastPickup?.nextPickupDate}
                isOverdue={status.isOverdue}
              />

              {medication.status === 'active' && onRecordPickup && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setSelectedMedication(medication)}
                    icon={<Clock className="h-5 w-5" />}
                  >
                    Record Pickup
                  </Button>
                </div>
              )}
            </div>

            {medicationPickups.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <MedicationHistory pickups={medicationPickups} />
              </div>
            )}
          </div>
        );
      })}

      {selectedMedication && onRecordPickup && (
        <RecordPickupModal
          medication={selectedMedication}
          onSubmit={onRecordPickup}
          onClose={() => setSelectedMedication(null)}
        />
      )}
    </div>
  );
}