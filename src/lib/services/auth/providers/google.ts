import { GoogleAuthProvider, signInWithPopup } from '@supabase/supabase-js';
import { supabase } from '../../../supabase';
import { AuthProvider, AuthSession } from '../types';
import { ServiceError } from '../../error';

export class GoogleAuthProvider implements AuthProvider {
  async signInWithGoogle(): Promise<AuthSession> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      
      return this.mapSession(data.session);
    } catch (error) {
      throw new ServiceError(
        'Failed to sign in with Google',
        'GOOGLE_AUTH_ERROR',
        'google',
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

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        role: session.user.user_metadata.role || 'patient',
        metadata: {
          name: session.user.user_metadata.full_name,
          avatar_url: session.user.user_metadata.avatar_url,
        },
      },
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
}