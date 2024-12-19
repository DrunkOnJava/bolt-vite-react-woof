import React from 'react';
import { User, Clock, DollarSign, AlertCircle } from 'lucide-react';
import type { Patient } from '../../../types/patient';
import { useMedications } from '../../../hooks/useMedications';
import { MedicationAlerts } from '../../medications/MedicationAlerts';

interface PatientSummaryProps {
  patient: Patient;
}

export function PatientSummary({ patient }: PatientSummaryProps) {
  const { medications, alerts, dismissAlert } = useMedications(patient.id);
  const currentMedication = medications[0];

  return (
    <div className="space-y-6">
      {alerts.length > 0 && (
        <MedicationAlerts alerts={alerts} onDismiss={dismissAlert} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{currentMedication?.contactInfo}</p>
              </div>
            </div>
            {patient.notes && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">{patient.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Next Refill</p>
                <p className={`font-medium ${
                  currentMedication?.daysUntilFill < 0 ? 'text-red-600' : ''
                }`}>
                  {currentMedication?.refillDue}
                </p>
              </div>
            </div>
            {currentMedication?.daysUntilFill < 0 && (
              <div className="flex items-center bg-red-50 p-3 rounded-md text-red-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>Overdue by {Math.abs(currentMedication.daysUntilFill)} days</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Monthly Cost</p>
                <p className="font-medium">{currentMedication?.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <span className="text-sm text-gray-600">Tier Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentMedication?.tier}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}