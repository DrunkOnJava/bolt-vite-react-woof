import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import type { Appointment } from '../../types';
import { formatDate, formatTime } from '../../utils/date';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => void;
  onReschedule?: () => void;
}

export function AppointmentCard({ 
  appointment,
  onCancel,
  onReschedule 
}: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Calendar className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{appointment.type}</h3>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span>Dr. {appointment.providerId}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{formatTime(appointment.time)}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(appointment.date)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {onReschedule && (
                <button
                  onClick={onReschedule}
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  Reschedule
                </button>
              )}
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="block text-sm text-red-600 hover:text-red-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}