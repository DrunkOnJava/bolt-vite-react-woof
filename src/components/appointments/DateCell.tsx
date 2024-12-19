import React from 'react';
import type { Appointment } from '../../types';

interface DateCellProps {
  day: number;
  date: Date;
  appointments: Appointment[];
  isSelected: boolean;
  onSelect: (date: Date) => void;
}

export function DateCell({ 
  day, 
  date, 
  appointments, 
  isSelected,
  onSelect 
}: DateCellProps) {
  const hasAppointment = appointments.some(
    apt => new Date(apt.date).toDateString() === date.toDateString()
  );

  return (
    <button
      onClick={() => onSelect(date)}
      className={`
        relative w-full p-2 hover:bg-blue-50 transition-colors
        ${isSelected ? 'bg-blue-100' : 'bg-white'}
        ${hasAppointment ? 'font-semibold text-blue-600' : ''}
      `}
    >
      {day}
      {hasAppointment && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="h-1 w-1 bg-blue-600 rounded-full" />
        </div>
      )}
    </button>
  );
}