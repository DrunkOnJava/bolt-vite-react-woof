import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import { usePatients } from '../../../hooks/usePatients';
import { formatPatientName } from '../../../utils/patient';

export function ProfileOverviewCard() {
  const { currentUser } = useUser();
  const { patients } = usePatients();
  const patient = patients.find(p => p.id === currentUser.patientId);

  if (!patient) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{formatPatientName(patient)}</p>
          </div>
        </div>

        {patient.email && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{patient.email}</p>
            </div>
          </div>
        )}

        {patient.phone && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{patient.phone}</p>
            </div>
          </div>
        )}

        {patient.dateOfBirth && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium text-gray-900">{patient.dateOfBirth}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}