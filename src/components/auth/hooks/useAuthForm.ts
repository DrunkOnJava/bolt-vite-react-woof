import { useState, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../../utils/auth';

export function useAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  const validateForm = useCallback(() => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return false;
    }

    return true;
  }, [email, password]);

  const handleSignIn = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signIn(email, password);
      return true;
    } catch (err) {
      setError('Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn, validateForm]);

  const handleSignUp = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp(email, password);
      return true;
    } catch (err) {
      setError('Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, password, signUp, validateForm]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    handleSignIn,
    handleSignUp,
  };
}