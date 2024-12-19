import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string;
  action?: React.ReactNode;
}

export function Card({ 
  title, 
  children, 
  className = '',
  loading = false,
  error,
  action
}: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {title}
            </h2>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}