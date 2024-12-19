import { useState, useCallback } from 'react';

interface HistoryEntry {
  id: string;
  date: string;
  type: 'visit' | 'note' | 'prescription' | 'test';
  description: string;
  provider: string;
}

export function usePatientHistory(patientId: string) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addHistoryEntry = useCallback((entry: Omit<HistoryEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setHistory(prev => [newEntry, ...prev]);
  }, []);

  return {
    history,
    addHistoryEntry,
  };
}