import React from 'react';
import { User, AlertCircle, Clock } from 'lucide-react';
import type { Patient } from '../../types/patient';
import { formatPatientName } from '../../utils/patient';
import { useMedications } from '../../hooks/useMedications';

interface PatientListItemProps {
  patient: Patient;
  onClick: () => void;
}

export function PatientListItem({ patient, onClick }: PatientListItemProps) {
  const { medications } = useMedications(patient.id);
  const currentMedication = medications[0];
  const hasOverdueMedications = medications.some(med => med.daysUntilFill < 0);

  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-gray-100 rounded-full">
          <User className="h-6 w-6 text-gray-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              {formatPatientName(patient)}
            </h3>
            <div className="flex items-center space-x-2">
              {hasOverdueMedications && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <Clock className="h-4 w-4 mr-1" />
                  Overdue
                </span>
              )}
              {patient.notes && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Notes
                </span>
              )}
            </div>
          </div>
          {currentMedication && (
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                {currentMedication.name} - {currentMedication.weeklyDosage}/week
                {currentMedication.daysUntilFill < 0 && (
                  <span className="text-red-600 ml-2">
                    ({Math.abs(currentMedication.daysUntilFill)} days overdue)
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500">
                Contact: {currentMedication.contactInfo} | Tier: {currentMedication.tier}
              </p>
            </div>
          )}
          {patient.notes && (
            <p className="mt-1 text-sm text-gray-500 truncate">{patient.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}