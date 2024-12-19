import React from 'react';
import { AuthError } from '../AuthError';
import { AuthSuccess } from '../AuthSuccess';

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  error?: string | null;
  success?: string | null;
  children: React.ReactNode;
}

export function AuthFormLayout({
  title,
  subtitle,
  error,
  success,
  children,
}: AuthFormLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {subtitle}
          </p>
        </div>

        {error && <AuthError message={error} />}
        {success && <AuthSuccess message={success} />}

        {children}
      </div>
    </div>
  );
}