import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import type { Patient } from '../../types/patient';
import { formatDate } from '../../utils/date';

interface PatientListProps {
  patients: Patient[];
  onPatientSelect: (patient: Patient) => void;
}

export function PatientList({ patients, onPatientSelect }: PatientListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {patients.map(patient => (
        <div
          key={patient.id}
          onClick={() => onPatientSelect(patient)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  patient.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </div>
              {patient.lastVisit && (
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last visit: {formatDate(patient.lastVisit)}</span>
                </div>
              )}
              {patient.nextAppointment && (
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Next appointment: {formatDate(patient.nextAppointment)}</span>
                </div>
              )}
              {patient.notes && (
                <p className="mt-1 text-sm text-gray-500">{patient.notes}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}