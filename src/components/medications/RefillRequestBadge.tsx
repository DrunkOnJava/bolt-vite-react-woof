import React from 'react';
import { Clock } from 'lucide-react';

interface RefillRequestBadgeProps {
  count: number;
}

export function RefillRequestBadge({ count }: RefillRequestBadgeProps) {
  if (count === 0) return null;

  return (
    <div className="flex items-center">
      <Clock className="h-4 w-4 text-red-500 mr-1" />
      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
        {count}
      </span>
    </div>
  );
}