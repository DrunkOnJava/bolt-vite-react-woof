import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { PatientList } from '../../components/patients/PatientList';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { usePatients } from '../../hooks/usePatients';
import { AddPatientModal } from '../../components/patients/AddPatientModal';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { patients, searchPatients, addPatient } = usePatients();

  const filteredPatients = searchQuery ? searchPatients(searchQuery) : patients;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="h-5 w-5" />}
        >
          Add Patient
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5 text-gray-400" />}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {filteredPatients.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No patients found
          </div>
        ) : (
          <PatientList
            patients={filteredPatients}
            onPatientSelect={(patient) => {
              // Navigate to patient profile
              console.log('Selected patient:', patient);
            }}
          />
        )}
      </div>

      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSubmit={addPatient}
        />
      )}
    </div>
  );
}