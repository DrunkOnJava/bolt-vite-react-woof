import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface MedicationStatusBadgeProps {
  status: 'active' | 'discontinued' | 'completed';
  isOverdue?: boolean;
  daysUntilFill?: number;
}

export function MedicationStatusBadge({ 
  status, 
  isOverdue,
  daysUntilFill 
}: MedicationStatusBadgeProps) {
  if (status !== 'active') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        {status === 'discontinued' ? 'Discontinued' : 'Completed'}
      </span>
    );
  }

  if (isOverdue || (daysUntilFill && daysUntilFill < 0)) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
        <AlertCircle className="h-4 w-4 mr-1" />
        Overdue
      </span>
    );
  }

  if (daysUntilFill !== undefined && daysUntilFill <= 7) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        <Clock className="h-4 w-4 mr-1" />
        Due Soon
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
      <CheckCircle className="h-4 w-4 mr-1" />
      Active
    </span>
  );
}