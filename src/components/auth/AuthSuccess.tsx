import React from 'react';
import { CheckCircle } from 'lucide-react';

interface AuthSuccessProps {
  message: string;
}

export function AuthSuccess({ message }: AuthSuccessProps) {
  return (
    <div className="rounded-md bg-green-50 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Success
          </h3>
          <div className="mt-2 text-sm text-green-700">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}