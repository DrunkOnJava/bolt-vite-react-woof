import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signUp(email, password);
      navigate('/auth/login', { 
        state: { message: 'Please check your email to verify your account.' }
      });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Join HealthPortal today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="h-5 w-5 text-gray-400" />}
            required
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}