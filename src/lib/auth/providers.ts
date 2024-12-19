import { supabase } from '../supabase';
import { AuthError } from './errors';

export async function signInWithEmailPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AuthError(error.message, error.code);
    return data;
  } catch (error) {
    throw new AuthError(
      'Failed to sign in',
      'SIGN_IN_ERROR',
      error
    );
  }
}

export async function signInWithGoogle() {
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

    if (error) throw new AuthError(error.message, error.code);
    return data;
  } catch (error) {
    throw new AuthError(
      'Failed to sign in with Google',
      'GOOGLE_SIGN_IN_ERROR',
      error
    );
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message, error.code);
  } catch (error) {
    throw new AuthError(
      'Failed to sign out',
      'SIGN_OUT_ERROR',
      error
    );
  }
}