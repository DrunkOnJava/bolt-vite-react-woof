import React from 'react';
import { useUser } from '../../context/UserContext';
import { useMedications } from '../../hooks/useMedications';
import { MedicationCard } from '../../components/medications/MedicationCard';
import { MedicationAlerts } from '../../components/medications/MedicationAlerts';
import { RecordPickupModal } from '../../components/medications/RecordPickupModal';
import { useToggle } from '../../hooks/useToggle';

export default function PrescriptionsPage() {
  const { currentUser } = useUser();
  const { medications, alerts, recordPickup, dismissAlert } = useMedications(currentUser.patientId!);
  const [selectedMedicationId, setSelectedMedicationId] = React.useState<string | null>(null);
  const [showPickupModal, togglePickupModal] = useToggle(false);

  const selectedMedication = medications.find(m => m.id === selectedMedicationId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Current Medications</h1>
      </div>

      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <MedicationAlerts
            alerts={alerts}
            onDismiss={dismissAlert}
          />
        </div>
      )}

      <div className="space-y-6">
        {medications.map(medication => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            onRecordPickup={() => {
              setSelectedMedicationId(medication.id);
              togglePickupModal(true);
            }}
          />
        ))}

        {medications.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No active medications found</p>
          </div>
        )}
      </div>

      {showPickupModal && selectedMedication && (
        <RecordPickupModal
          medication={selectedMedication}
          onSubmit={(data) => {
            recordPickup(data);
            togglePickupModal(false);
          }}
          onClose={() => togglePickupModal(false)}
        />
      )}
    </div>
  );
}