export interface AuthError {
  code: string;
  message: string;
  originalError?: unknown;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'patient' | 'provider';
  emailVerified: boolean;
  metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  acceptedTerms: boolean;
}