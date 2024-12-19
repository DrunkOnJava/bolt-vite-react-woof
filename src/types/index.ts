// Export all type definitions and constants
export * from './auth';
export * from './medication';
export * from './patient';
export * from './receipt';

// Re-export MOCK_ACCOUNTS
export const MOCK_ACCOUNTS = [
  {
    id: 'provider1',
    name: 'Dr. Griffin',
    email: 'griffin@healthportal.com',
    role: 'provider' as const,
    providerId: 'provider1',
  },
  {
    id: 'provider2',
    name: 'Dr. Michael',
    email: 'michael@healthportal.com',
    role: 'provider' as const,
    providerId: 'provider2',
  },
  {
    id: 'p1',
    name: 'Zach Bligh',
    email: 'zach@example.com',
    role: 'patient' as const,
    patientId: 'p1',
  },
  {
    id: 'p2',
    name: 'Jodi',
    email: 'jodi@example.com',
    role: 'patient' as const,
    patientId: 'p2',
  },
  {
    id: 'p3',
    name: 'Michael',
    email: 'michael.patient@example.com',
    role: 'patient' as const,
    patientId: 'p3',
  },
  // Add more mock accounts as needed
];

export type UserAccount = typeof MOCK_ACCOUNTS[number];