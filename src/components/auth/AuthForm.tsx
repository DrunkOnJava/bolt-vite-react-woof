import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';
import { RememberMeCheckbox } from './RememberMeCheckbox';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useAuthForm } from '../../hooks/useAuthForm';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string; rememberMe: boolean }) => Promise<void>;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const {
    formData,
    setFormData,
    errors,
    loading,
  } = useAuthForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        icon={<Mail className="h-5 w-5 text-gray-400" />}
        error={errors.email}
        required
      />

      <PasswordInput
        value={formData.password}
        onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
        error={errors.password}
        showStrength={type === 'register'}
      />

      <div className="flex items-center justify-between">
        <RememberMeCheckbox
          checked={formData.rememberMe}
          onChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
        />

        {type === 'login' && (
          <Link
            to="/auth/reset-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        {type === 'login' ? 'Sign in' : 'Create account'}
      </Button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <GoogleSignInButton />

      <div className="text-center text-sm">
        {type === 'login' ? (
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}