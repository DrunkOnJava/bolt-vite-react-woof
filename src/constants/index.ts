export const APP_NAME = 'HealthPortal';

export const ROUTES = {
  PATIENT: {
    DASHBOARD: '/dashboard',
    APPOINTMENTS: '/appointments',
    MESSAGES: '/messages',
    MEDICATIONS: '/medications',
    RECEIPTS: '/receipts'
  },
  PROVIDER: {
    DASHBOARD: '/provider/dashboard',
    PATIENTS: '/provider/patients',
    MESSAGES: '/provider/messages',
    REFILLS: '/provider/refills'
  }
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  USER: 'user',
  AUTH_TOKEN: 'auth_token'
} as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  APPOINTMENTS: '/api/appointments',
  MESSAGES: '/api/messages',
  PRESCRIPTIONS: '/api/prescriptions',
  RECEIPTS: '/api/receipts'
} as const;