export interface AuthUser {
  id: string;
  email: string;
  role: string;
  metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export interface AuthSession {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthProvider {
  signIn?(email: string, password: string): Promise<AuthSession>;
  signUp?(email: string, password: string): Promise<AuthSession>;
  signInWithGoogle?(): Promise<AuthSession>;
  signOut(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  onAuthStateChange(callback: (session: AuthSession | null) => void): () => void;
}