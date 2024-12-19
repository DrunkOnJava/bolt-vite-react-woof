import { useState, useCallback } from 'react';
import { addMonths } from '../utils/calendar';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => addMonths(prev, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => addMonths(prev, 1));
  }, []);

  const setDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  return {
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    setDate,
  };
}