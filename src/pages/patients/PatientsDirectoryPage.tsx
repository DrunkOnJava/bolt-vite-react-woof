import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientSearchBar } from '../../components/patients/PatientSearchBar';
import { PatientListItem } from '../../components/patients/PatientListItem';
import { usePatients } from '../../hooks/usePatients';
import { searchPatients, sortPatients } from '../../utils/patient';

export default function PatientsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { patients } = usePatients();
  const navigate = useNavigate();

  const filteredPatients = searchQuery 
    ? searchPatients(patients, searchQuery)
    : patients;
  
  const sortedPatients = sortPatients(filteredPatients);

  const handlePatientSelect = (patientId: string) => {
    navigate(`/provider/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Directory</h1>
      </div>

      <PatientSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {sortedPatients.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No patients found
          </div>
        ) : (
          sortedPatients.map(patient => (
            <PatientListItem
              key={patient.id}
              patient={patient}
              onClick={() => handlePatientSelect(patient.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}