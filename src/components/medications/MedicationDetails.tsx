import React from 'react';
import { Droplet, Calendar } from 'lucide-react';
import { useMedications } from '../../hooks/useMedications';

interface MedicationDetailsProps {
  medication: Medication;
  lastPickupDate?: string;
  nextPickupDate?: string;
  isOverdue?: boolean;
}

export function MedicationDetails({ 
  medication,
  lastPickupDate,
  nextPickupDate,
  isOverdue
}: MedicationDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{medication.name}</h3>
          <p className="text-sm text-gray-500">Contact: {medication.contactInfo}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            medication.tier === 'Tier 1' ? 'bg-blue-100 text-blue-800' :
            medication.tier === 'Tier 2' ? 'bg-purple-100 text-purple-800' :
            'bg-indigo-100 text-indigo-800'
          }`}>
            {medication.tier}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {medication.price}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Weekly Dosage</h4>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex items-center">
                <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-lg font-medium">{medication.weeklyDosage}</span>
              </div>
              <span className="text-sm text-gray-500">
                Volume: {medication.weeklyVolume}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Monthly Dosage</h4>
            <div className="mt-1 flex items-center space-x-4">
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

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Last Fill Date</h4>
            <div className="mt-1 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-lg font-medium">{medication.lastFillDate}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Next Refill Due</h4>
            <div className="mt-1 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className={`text-lg font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                {medication.refillDue}
                {isOverdue && (
                  <span className="ml-2 text-sm">
                    ({Math.abs(medication.daysUntilFill)} days overdue)
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}