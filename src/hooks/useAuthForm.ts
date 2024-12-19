import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { validateEmail, validatePassword } from '../lib/auth/validation';
import { useNotifications } from '../context/NotificationContext';

interface AuthFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function useAuthForm() {
  const [formData, setFormData] = useState<AuthFormState>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { addNotification } = useNotifications();

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignIn = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      return true;
    } catch (error) {
      addNotification('error', 'Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  }, [formData, signIn, validateForm, addNotification]);

  const handleSignUp = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp(formData.email, formData.password);
      addNotification('success', 'Please check your email to verify your account');
      return true;
    } catch (error) {
      addNotification('error', 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  }, [formData, signUp, validateForm, addNotification]);

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleSignIn,
    handleSignUp,
  };
}