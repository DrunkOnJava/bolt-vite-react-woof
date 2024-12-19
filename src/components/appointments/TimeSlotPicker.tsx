import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  availableSlots: TimeSlot[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export function TimeSlotPicker({
  availableSlots,
  selectedTime,
  onTimeSelect,
}: TimeSlotPickerProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Available Time Slots</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableSlots.map(({ time, available }) => (
          <button
            key={time}
            onClick={() => available && onTimeSelect(time)}
            disabled={!available}
            className={`
              p-3 rounded-lg flex items-center space-x-2
              ${
                selectedTime === time
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                  : available
                  ? 'bg-white border-2 border-gray-200 hover:border-blue-500'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-selected={selectedTime === time}
            role="option"
          >
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </button>
        ))}
      </div>
    </div>
  );
}