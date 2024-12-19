import React from 'react';
import { Droplet, Calendar } from 'lucide-react';
import { useMedications } from '../../../hooks/useMedications';

interface MedicationDetailsProps {
  patientId: string;
}

export function MedicationDetails({ patientId }: MedicationDetailsProps) {
  const { medications } = useMedications(patientId);
  const currentMedication = medications[0];

  if (!currentMedication) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Medication</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dosage Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Weekly Dosage</p>
                <p className="text-lg font-medium mt-1">{currentMedication.weeklyDosage}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Monthly Dosage</p>
                <p className="text-lg font-medium mt-1">{currentMedication.monthlyDosage}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Volume Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <p className="text-sm text-gray-500">Weekly Volume</p>
                </div>
                <p className="text-lg font-medium mt-1">{currentMedication.weeklyVolume}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <p className="text-sm text-gray-500">Monthly Volume</p>
                </div>
                <p className="text-lg font-medium mt-1">{currentMedication.monthlyVolume}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fill History</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Last Fill Date</p>
                  <p className="font-medium mt-1">{currentMedication.lastFillDate}</p>
                </div>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Next Fill Due</p>
                  <p className={`font-medium mt-1 ${
                    currentMedication.daysUntilFill < 0 ? 'text-red-600' : ''
                  }`}>
                    {currentMedication.refillDue}
                  </p>
                </div>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}