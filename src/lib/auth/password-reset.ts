import { supabase } from '../supabase';
import { AuthError } from './types';
import { validatePassword } from './validation';

export async function requestPasswordReset(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  } catch (error) {
    throw new AuthError({
      code: 'password-reset-request-failed',
      message: 'Failed to send password reset email',
      originalError: error,
    });
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    throw new AuthError({
      code: 'invalid-password',
      message: passwordError,
    });
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  } catch (error) {
    throw new AuthError({
      code: 'password-reset-failed',
      message: 'Failed to reset password',
      originalError: error,
    });
  }
}