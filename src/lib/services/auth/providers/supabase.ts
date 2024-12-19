import { supabase } from '../../../supabase';
import { AuthProvider, AuthSession, AuthUser } from '../types';
import { ServiceError } from '../../error';

export class SupabaseAuthProvider implements AuthProvider {
  async signIn(email: string, password: string): Promise<AuthSession> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return this.mapSession(data.session);
    } catch (error) {
      throw new ServiceError(
        'Failed to sign in',
        'AUTH_SIGNIN_ERROR',
        'supabase',
        error
      );
    }
  }

  async signUp(email: string, password: string): Promise<AuthSession> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      return this.mapSession(data.session);
    } catch (error) {
      throw new ServiceError(
        'Failed to sign up',
        'AUTH_SIGNUP_ERROR',
        'supabase',
        error
      );
    }
  }

  private mapSession(session: any): AuthSession {
    if (!session) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    }

    const user: AuthUser = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.user_metadata.role || 'patient',
      metadata: session.user.user_metadata,
    };

    return {
      user,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
}