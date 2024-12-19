import type { Appointment } from '../types';

export function getAppointmentsForDate(appointments: Appointment[], date: Date): Appointment[] {
  return appointments.filter(apt => 
    new Date(apt.date).toDateString() === date.toDateString()
  );
}

export function generateTimeSlots(
  startHour: number = 9,
  endHour: number = 17,
  intervalMinutes: number = 30
): { time: string; available: boolean }[] {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        time,
        available: Math.random() > 0.3, // In real app, this would check against actual availability
      });
    }
  }
  return slots;
}

export function isDateAvailable(date: Date, appointments: Appointment[]): boolean {
  const dayAppointments = getAppointmentsForDate(appointments, date);
  // In a real app, this would check against business rules (e.g., max appointments per day)
  return dayAppointments.length < 8;
}