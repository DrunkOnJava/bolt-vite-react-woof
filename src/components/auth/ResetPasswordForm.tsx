import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';
import { resetPassword } from '../../lib/auth/password-reset';
import { useNotifications } from '../../context/NotificationContext';

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = searchParams.get('token');
    
    if (!token) {
      addNotification('error', 'Invalid reset link');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      addNotification('success', 'Password reset successfully');
      navigate('/auth/login');
    } catch (error) {
      addNotification('error', error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PasswordInput
        value={password}
        onChange={setPassword}
        showStrength
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        icon={<Lock className="h-5 w-5" />}
      >
        Reset Password
      </Button>
    </form>
  );
}