import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPatientName } from '../../../utils/patient';
import type { Patient } from '../../../types/patient';

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => navigate('/provider/patients')}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="Back to patient directory"
      >
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {formatPatientName(patient)}
        </h1>
        {patient.notes && (
          <p className="text-sm text-gray-500 mt-1">{patient.notes}</p>
        )}
      </div>
    </div>
  );
}