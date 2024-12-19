export interface AuthUser {
  id: string;
  email: string;
  role: 'patient' | 'provider';
  patientId?: string;
  providerId?: string;
  emailVerified: boolean;
  metadata: {
    name?: string;
    avatar_url?: string;
  };
}

export interface AuthSession {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthError {
  message: string;
  status?: number;
}