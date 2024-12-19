import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PatientProfile } from '../../components/patients/profile/PatientProfile';
import { Button } from '../../components/ui/Button';
import { usePatients } from '../../hooks/usePatients';

export default function PatientProfilePage() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patients } = usePatients();
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Patient not found</h2>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate('/provider/patients')}
        >
          Return to Directory
        </Button>
      </div>
    );
  }

  return <PatientProfile patient={patient} />;
}