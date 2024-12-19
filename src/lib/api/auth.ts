import { supabase } from '../supabase';
import type { AuthUser } from '../../types/auth';

export const authApi = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          role: 'patient',
          emailVerified: session.user.email_confirmed_at !== null,
          metadata: {
            name: session.user.user_metadata.full_name,
            avatar_url: session.user.user_metadata.avatar_url,
          },
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};