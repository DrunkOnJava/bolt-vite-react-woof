import React from 'react';
import { Calendar } from 'lucide-react';
import type { MedicationPickup } from '../../types/medication';
import { formatDate, formatTime } from '../../utils/date';

interface MedicationHistoryProps {
  pickups: MedicationPickup[];
}

export function MedicationHistory({ pickups }: MedicationHistoryProps) {
  const sortedPickups = [...pickups].sort(
    (a, b) => new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime()
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Pickup History</h3>
      
      <div className="space-y-4">
        {sortedPickups.map(pickup => (
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
                  {formatDate(pickup.pickupDate)} at {formatTime(pickup.pickupDate)}
                </span>
              </div>
              {pickup.notes && (
                <p className="mt-1 text-sm text-gray-500">{pickup.notes}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Next pickup scheduled for: {formatDate(pickup.nextPickupDate)}
              </p>
            </div>
          </div>
        ))}

        {sortedPickups.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No pickup history available
          </p>
        )}
      </div>
    </div>
  );
}