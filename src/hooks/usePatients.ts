import { useState, useCallback } from 'react';
import { Patient, PATIENTS } from '../types/patient';
import { useNotifications } from '../context/NotificationContext';

export function usePatients(initialPatients: Patient[] = PATIENTS) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const { addNotification } = useNotifications();

  const updatePatient = useCallback((patientId: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId ? { ...patient, ...updates } : patient
    ));
    addNotification('success', 'Patient information updated successfully');
  }, [addNotification]);

  const setPatientStatus = useCallback((patientId: string, status: Patient['status']) => {
    updatePatient(patientId, { status });
  }, [updatePatient]);

  const addPatient = useCallback((patient: Omit<Patient, 'id'>) => {
    const newPatient = {
      ...patient,
      id: `p${Date.now()}`,
    };
    setPatients(prev => [...prev, newPatient]);
    addNotification('success', 'Patient added successfully');
    return newPatient;
  }, [addNotification]);

  const searchPatients = useCallback((query: string) => {
    const searchTerm = query.toLowerCase();
    return patients.filter(patient => 
      patient.firstName.toLowerCase().includes(searchTerm) ||
      patient.lastName.toLowerCase().includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchTerm) ||
      patient.notes?.toLowerCase().includes(searchTerm)
    );
  }, [patients]);

  return {
    patients,
    updatePatient,
    setPatientStatus,
    addPatient,
    searchPatients,
  };
}