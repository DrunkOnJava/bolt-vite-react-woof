import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import type { Patient } from '../../types/patient';
import { Button } from '../ui/Button';

interface PatientCardProps {
  patient: Patient;
  onEdit?: () => void;
}

export function PatientCard({ patient, onEdit }: PatientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h2>
            {patient.email && (
              <div className="mt-1 flex items-center text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                <span>{patient.email}</span>
              </div>
            )}
            {patient.phone && (
              <div className="mt-1 flex items-center text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                <span>{patient.phone}</span>
              </div>
            )}
            {patient.dateOfBirth && (
              <div className="mt-1 flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{patient.dateOfBirth}</span>
              </div>
            )}
          </div>
        </div>
        {onEdit && (
          <Button onClick={onEdit} variant="secondary">
            Edit Details
          </Button>
        )}
      </div>
      {patient.notes && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900">Notes</h3>
          <p className="mt-1 text-sm text-gray-500">{patient.notes}</p>
        </div>
      )}
    </div>
  );
}