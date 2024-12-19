import { useState, useCallback } from 'react';
import type { Appointment } from '../types';
import { useNotifications } from '../context/NotificationContext';

export function useAppointments(initialAppointments: Appointment[] = []) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const { addNotification } = useNotifications();

  const scheduleAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(), // In real app, this would come from the backend
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    addNotification('success', 'Appointment scheduled successfully');
    return newAppointment;
  }, [addNotification]);

  const cancelAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    addNotification('success', 'Appointment cancelled successfully');
  }, [addNotification]);

  return {
    appointments,
    scheduleAppointment,
    cancelAppointment,
  };
}