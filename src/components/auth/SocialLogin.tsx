import React from 'react';
import { Button } from '../ui/Button';

interface SocialLoginProps {
  onGoogleLogin: () => Promise<void>;
}

export function SocialLogin({ onGoogleLogin }: SocialLoginProps) {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onGoogleLogin}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}