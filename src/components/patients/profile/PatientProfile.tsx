import React from 'react';
import type { Patient } from '../../../types/patient';
import { PatientHeader } from './PatientHeader';
import { PatientOverview } from './PatientOverview';
import { PersonalInfoCard } from './cards/PersonalInfoCard';
import { MedicationCard } from './cards/MedicationCard';
import { DeliveryInfoCard } from './cards/DeliveryInfoCard';
import { PickupHistoryCard } from './cards/PickupHistoryCard';
import { useMedications } from '../../../hooks/useMedications';
import { usePatients } from '../../../hooks/usePatients';

interface PatientProfileProps {
  patient: Patient;
}

export function PatientProfile({ patient }: PatientProfileProps) {
  const { medications, recordPickup } = useMedications(patient.id);
  const { updatePatient } = usePatients();
  const currentMedication = medications[0];

  if (!currentMedication) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">No medication data available</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PatientHeader patient={patient} />
      <PatientOverview patient={patient} />
      
      <div className="grid grid-cols-1 gap-6">
        <PersonalInfoCard
          patient={patient}
          onUpdate={updates => updatePatient(patient.id, updates)}
        />
        
        <MedicationCard
          medication={currentMedication}
          onUpdate={updates => {
            // Handle medication updates
            console.log('Medication updates:', updates);
          }}
        />
        
        <DeliveryInfoCard
          medication={currentMedication}
          onUpdate={updates => {
            // Handle delivery info updates
            console.log('Delivery updates:', updates);
          }}
        />
        
        <PickupHistoryCard
          patientId={patient.id}
          medication={currentMedication}
          onRecordPickup={recordPickup}
        />
      </div>
    </div>
  );
}