import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { MedicationOverviewCard } from '../../components/dashboard/cards/MedicationOverviewCard';
import { MessagesPreviewCard } from '../../components/dashboard/cards/MessagesPreviewCard';
import { ProfileOverviewCard } from '../../components/dashboard/cards/ProfileOverviewCard';
import { DeliveryStatusCard } from '../../components/dashboard/cards/DeliveryStatusCard';
import { RefillRequestModal } from '../../components/medications/RefillRequestModal';
import { useRefillRequests } from '../../hooks/useRefillRequests';
import { useMedications } from '../../hooks/useMedications';

export default function PatientDashboard() {
  const { currentUser } = useUser();
  const { medications } = useMedications(currentUser.patientId!);
  const { createRequest } = useRefillRequests();
  const [showRefillModal, setShowRefillModal] = useState(false);

  const currentMedication = medications[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicationOverviewCard
          patientId={currentUser.patientId!}
          onRequestRefill={() => setShowRefillModal(true)}
        />
        <DeliveryStatusCard patientId={currentUser.patientId!} />
        <ProfileOverviewCard />
        <MessagesPreviewCard />
      </div>

      {showRefillModal && currentMedication && (
        <RefillRequestModal
          medication={currentMedication}
          onSubmit={(data) => {
            createRequest({
              ...data,
              patientId: currentUser.patientId!,
            });
            setShowRefillModal(false);
          }}
          onClose={() => setShowRefillModal(false)}
        />
      )}
    </div>
  );
}