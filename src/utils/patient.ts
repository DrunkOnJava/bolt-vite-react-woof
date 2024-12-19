import { Patient } from '../types/patient';

export function formatPatientName(patient: Patient): string {
  return `${patient.firstName}${patient.lastName ? ` ${patient.lastName}` : ''}`;
}

export function searchPatients(patients: Patient[], query: string): Patient[] {
  const searchTerm = query.toLowerCase();
  return patients.filter(patient => 
    patient.firstName.toLowerCase().includes(searchTerm) ||
    (patient.lastName && patient.lastName.toLowerCase().includes(searchTerm)) ||
    (patient.notes && patient.notes.toLowerCase().includes(searchTerm))
  );
}

export function sortPatients(patients: Patient[]): Patient[] {
  return [...patients].sort((a, b) => {
    // Sort by first name, then last name if available
    const nameA = formatPatientName(a).toLowerCase();
    const nameB = formatPatientName(b).toLowerCase();
    return nameA.localeCompare(nameB);
  });
}