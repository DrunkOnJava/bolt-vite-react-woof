import { useEffect, useState } from 'react';
import { auth, db, storage, analytics } from '../lib/services';
import type { ServiceStatus } from '../types';

export function useServices() {
  const [status, setStatus] = useState<Record<string, ServiceStatus>>({
    auth: { ready: false },
    database: { ready: false },
    storage: { ready: false },
    analytics: { ready: false },
  });

  useEffect(() => {
    const checkServices = async () => {
      try {
        // Check auth service
        const session = await auth.getSession();
        setStatus(prev => ({
          ...prev,
          auth: { ready: true, session },
        }));

        // Check other services
        // Add similar checks for database, storage, analytics
      } catch (error) {
        console.error('Service check failed:', error);
      }
    };

    checkServices();
  }, []);

  return status;
}