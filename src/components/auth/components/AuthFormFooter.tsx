import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export function AuthFormFooter({ text, linkText, linkTo }: AuthFormFooterProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        {text}{' '}
        <Link
          to={linkTo}
          className="text-blue-600 hover:text-blue-500"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}