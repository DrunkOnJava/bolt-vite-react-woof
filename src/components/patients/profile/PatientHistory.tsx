import React from 'react';
import { Calendar } from 'lucide-react';
import { useMedications } from '../../../hooks/useMedications';

interface PatientHistoryProps {
  patientId: string;
}

export function PatientHistory({ patientId }: PatientHistoryProps) {
  const { pickups } = useMedications(patientId);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Pickup History</h2>
      
      {pickups.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No pickup history available
        </div>
      ) : (
        <div className="space-y-4">
          {pickups.map(pickup => (
            <div key={pickup.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Quantity: {pickup.quantity}</p>
                <p className="text-sm text-gray-500">
                  Pickup Date: {new Date(pickup.pickupDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Next Pickup: {new Date(pickup.nextPickupDate).toLocaleDateString()}
                </p>
                {pickup.notes && (
                  <p className="text-sm text-gray-500 mt-2">{pickup.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}