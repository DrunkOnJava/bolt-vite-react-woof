import React from 'react';
import { validatePassword } from '../../utils/auth';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const error = validatePassword(password);
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-1">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            strength === 'weak' ? 'w-1/3 bg-red-500' :
            strength === 'medium' ? 'w-2/3 bg-yellow-500' :
            'w-full bg-green-500'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak';
  
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score === 3) return 'medium';
  return 'strong';
}