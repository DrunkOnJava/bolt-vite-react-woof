import React from 'react';
import { Clock, AlertCircle, DollarSign, User } from 'lucide-react';
import type { Patient } from '../../../types/patient';
import { useMedications } from '../../../hooks/useMedications';
import { MedicationAlerts } from '../../medications/MedicationAlerts';

interface PatientOverviewProps {
  patient: Patient;
}

export function PatientOverview({ patient }: PatientOverviewProps) {
  const { medications, alerts, dismissAlert } = useMedications(patient.id);
  const overdueMedications = medications.filter(med => med.daysUntilFill < 0);
  const currentMedication = medications[0];
  
  return (
    <div className="space-y-6">
      {alerts.length > 0 && (
        <MedicationAlerts 
          alerts={alerts}
          onDismiss={dismissAlert}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Contact</h3>
          </div>
          {currentMedication?.contactInfo && (
            <p className="mt-2 text-gray-600">
              Assigned to: <span className="font-medium">{currentMedication.contactInfo}</span>
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Next Refill</h3>
          </div>
          {currentMedication && (
            <p className={`mt-2 ${currentMedication.daysUntilFill < 0 ? 'text-red-600' : 'text-gray-600'}`}>
              Due: {currentMedication.refillDue}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">Price</h3>
          </div>
          {currentMedication && (
            <p className="mt-2 text-gray-600 font-medium">
              {currentMedication.price}
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Tier Status</h3>
            {currentMedication?.tier && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentMedication.tier}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}