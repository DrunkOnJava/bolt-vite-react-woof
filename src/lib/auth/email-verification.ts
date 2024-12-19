import { supabase } from '../supabase';
import { AuthError } from './types';

export async function sendVerificationEmail(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/verify-email`,
    });

    if (error) throw error;
  } catch (error) {
    throw new AuthError({
      code: 'verification-email-failed',
      message: 'Failed to send verification email',
      originalError: error,
    });
  }
}

export async function verifyEmail(token: string): Promise<void> {
  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) throw error;
  } catch (error) {
    throw new AuthError({
      code: 'email-verification-failed',
      message: 'Failed to verify email',
      originalError: error,
    });
  }
}