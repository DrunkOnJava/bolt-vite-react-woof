import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../ui/Input';
import { getPasswordStrength } from '../../lib/auth/validation';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showStrength?: boolean;
}

export function PasswordInput({ value, onChange, error, showStrength }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          error={error}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {showStrength && value && (
        <div className="space-y-1">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength === 'weak' ? 'w-1/3 bg-red-500' :
                strength === 'medium' ? 'w-2/3 bg-yellow-500' :
                'w-full bg-green-500'
              }`}
            />
          </div>
          <p className={`text-xs ${
            strength === 'weak' ? 'text-red-600' :
            strength === 'medium' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            Password strength: {strength}
          </p>
        </div>
      )}
    </div>
  );
}