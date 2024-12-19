import React, { useState } from 'react';
import { AppointmentCalendar } from '../../components/appointments/AppointmentCalendar';
import { TimeSlotPicker } from '../../components/appointments/TimeSlotPicker';
import { AppointmentCard } from '../../components/appointments/AppointmentCard';
import { Button } from '../../components/ui/Button';
import type { Appointment } from '../../types';
import { useNotifications } from '../../context/NotificationContext';

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'patient1',
    providerId: 'provider1',
    date: '2024-03-15',
    time: '14:30',
    type: 'Annual Check-up',
    status: 'scheduled',
  },
];

const mockTimeSlots = Array.from({ length: 8 }, (_, i) => ({
  time: `${i + 9}:00`,
  available: Math.random() > 0.3,
}));

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    
    addNotification('success', 'Appointment scheduled successfully');
    setSelectedTime(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AppointmentCalendar
            appointments={mockAppointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>

        <div className="space-y-6">
          <TimeSlotPicker
            availableSlots={mockTimeSlots}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />

          {selectedDate && selectedTime && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Appointment Summary
              </h3>
              <AppointmentCard
                appointment={{
                  id: 'new',
                  patientId: 'patient1',
                  providerId: 'provider1',
                  date: selectedDate.toISOString(),
                  time: selectedTime,
                  type: 'Check-up',
                  status: 'pending',
                }}
              />
              <Button
                className="mt-4 w-full"
                onClick={handleConfirmAppointment}
              >
                Confirm Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}