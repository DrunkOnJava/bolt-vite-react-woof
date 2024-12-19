import React from 'react';

interface TermsOfServiceProps {
  accepted: boolean;
  onAccept: (accepted: boolean) => void;
}

export function TermsOfService({ accepted, onAccept }: TermsOfServiceProps) {
  return (
    <label className="flex items-start space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={accepted}
        onChange={(e) => onAccept(e.target.checked)}
        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        required
      />
      <span className="text-sm text-gray-600">
        I agree to the{' '}
        <a
          href="/terms"
          className="text-blue-600 hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        {' '}and{' '}
        <a
          href="/privacy"
          className="text-blue-600 hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </span>
    </label>
  );
}