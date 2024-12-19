import { useCallback, useState } from 'react';
import { db } from '../../lib/services';
import type { QueryOptions } from '../../lib/services/database/types';
import { useNotifications } from '../../context/NotificationContext';

export function useDatabase<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  const query = useCallback(async (options?: QueryOptions) => {
    setLoading(true);
    try {
      const data = await db.query<T>(table, options);
      return data;
    } catch (error) {
      addNotification('error', 'Failed to fetch data');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [table, addNotification]);

  return {
    query,
    loading,
  };
}