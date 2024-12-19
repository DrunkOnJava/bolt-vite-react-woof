import React from 'react';
import { Mail } from 'lucide-react';

interface VerifyEmailProps {
  email: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h2>
        
        <p className="text-gray-600 mb-6">
          We sent a verification link to<br />
          <span className="font-medium">{email}</span>
        </p>
        
        <p className="text-sm text-gray-500">
          Click the link in the email to verify your account.<br />
          If you don't see it, check your spam folder.
        </p>

        <div className="mt-8">
          <a
            href="/auth/login"
            className="text-blue-600 hover:text-blue-500"
          >
            Return to login
          </a>
        </div>
      </div>
    </div>
  );
}