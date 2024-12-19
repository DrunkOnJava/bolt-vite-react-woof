import React from 'react';
import { Truck, Package, Calendar } from 'lucide-react';
import { useMedications } from '../../../hooks/useMedications';
import { formatDate } from '../../../utils/date';

interface DeliveryStatusCardProps {
  patientId: string;
}

export function DeliveryStatusCard({ patientId }: DeliveryStatusCardProps) {
  const { medications, pickups } = useMedications(patientId);
  const currentMedication = medications[0];
  const lastPickup = pickups[0];

  if (!currentMedication) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Status</h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <Package className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Fill Date</p>
            <p className="font-medium text-gray-900">{currentMedication.lastFillDate}</p>
          </div>
        </div>

        {lastPickup && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Truck className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Pickup</p>
              <p className="font-medium text-gray-900">{formatDate(lastPickup.pickupDate)}</p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Refill Due</p>
            <p className="font-medium text-gray-900">{currentMedication.refillDue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}