import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { EditableCard } from '../EditableCard';
import { Button } from '../../../ui/Button';
import { RecordPickupModal } from '../../../medications/RecordPickupModal';
import { useMedications } from '../../../../hooks/useMedications';
import type { Medication } from '../../../../types/medication';
import { formatDate } from '../../../../utils/date';

interface PickupHistoryCardProps {
  patientId: string;
  medication: Medication;
  onRecordPickup: (data: {
    medicationId: string;
    pickupDate: string;
    quantity: number;
    notes?: string;
  }) => void;
}

export function PickupHistoryCard({ 
  patientId, 
  medication,
  onRecordPickup 
}: PickupHistoryCardProps) {
  const [showPickupModal, setShowPickupModal] = useState(false);
  const { pickups } = useMedications(patientId);
  const medicationPickups = pickups.filter(p => p.medicationId === medication.id);

  const handlePickupRecord = (data: {
    medicationId: string;
    pickupDate: string;
    quantity: number;
    notes?: string;
  }) => {
    onRecordPickup(data);
    setShowPickupModal(false);
  };

  return (
    <>
      <EditableCard
        title="Pickup History"
        isEditing={false}
        onEdit={() => {}}
        onSave={() => {}}
        onCancel={() => {}}
        actionButton={
          <Button
            onClick={() => setShowPickupModal(true)}
            variant="primary"
            size="sm"
            icon={<Plus className="h-4 w-4" />}
          >
            Record Pickup
          </Button>
        }
      >
        <div className="space-y-4">
          {medicationPickups.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No pickup history available</p>
          ) : (
            medicationPickups.map(pickup => (
              <div 
                key={pickup.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      Quantity: {pickup.quantity}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(pickup.pickupDate)}
                    </span>
                  </div>
                  {pickup.notes && (
                    <p className="mt-1 text-sm text-gray-500">{pickup.notes}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Next pickup due: {formatDate(pickup.nextPickupDate)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </EditableCard>

      {showPickupModal && (
        <RecordPickupModal
          medication={medication}
          onSubmit={handlePickupRecord}
          onClose={() => setShowPickupModal(false)}
        />
      )}
    </>
  );
}