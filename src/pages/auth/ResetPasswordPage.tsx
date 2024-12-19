import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await resetPassword(email);
      setSent(true);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Check your email
          </h2>
          <p className="text-gray-600">
            We've sent password reset instructions to {email}
          </p>
          <a
            href="/auth/login"
            className="mt-6 inline-block text-blue-600 hover:text-blue-500"
          >
            Return to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Send Reset Instructions
          </Button>
        </form>

        <div className="text-center">
          <a
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}