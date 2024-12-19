import React from 'react';
import { Pill, Clock, AlertCircle } from 'lucide-react';
import { useMedications } from '../../../hooks/useMedications';
import { Button } from '../../ui/Button';

interface MedicationOverviewCardProps {
  patientId: string;
  onRequestRefill: () => void;
}

export function MedicationOverviewCard({ patientId, onRequestRefill }: MedicationOverviewCardProps) {
  const { medications } = useMedications(patientId);
  const currentMedication = medications[0];

  if (!currentMedication) return null;

  const isOverdue = currentMedication.daysUntilFill < 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Current Medication</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRequestRefill}
        >
          Request Refill
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Pill className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{currentMedication.name}</h3>
            <p className="text-sm text-gray-500">
              Weekly: {currentMedication.weeklyDosage} ({currentMedication.weeklyVolume})
            </p>
            <div className="mt-1 flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                currentMedication.tier === 'Tier 1' ? 'bg-blue-100 text-blue-800' :
                currentMedication.tier === 'Tier 2' ? 'bg-purple-100 text-purple-800' :
                'bg-indigo-100 text-indigo-800'
              }`}>
                {currentMedication.tier}
              </span>
              <span className="text-sm font-medium">{currentMedication.price}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Next Refill: {currentMedication.refillDue}</span>
            </div>
            {isOverdue && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {Math.abs(currentMedication.daysUntilFill)} days overdue
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}