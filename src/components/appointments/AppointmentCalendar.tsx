import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DateCell } from './DateCell';
import type { Appointment } from '../../types';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function AppointmentCalendar({
  appointments,
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
}: AppointmentCalendarProps) {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={onPrevMonth} 
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={onNextMonth} 
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div 
            key={day} 
            className="bg-gray-50 p-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
        {padding.map((_, index) => (
          <div key={`padding-${index}`} className="bg-white p-2" />
        ))}
        {days.map((day) => {
          const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            day
          );
          
          return (
            <DateCell
              key={day}
              day={day}
              date={date}
              appointments={appointments}
              isSelected={
                date.toDateString() === selectedDate.toDateString()
              }
              onSelect={onDateSelect}
            />
          );
        })}
      </div>
    </div>
  );
}