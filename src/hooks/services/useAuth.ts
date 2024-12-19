import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../lib/services';
import type { AuthSession } from '../../lib/services/auth/types';
import { useNotifications } from '../../context/NotificationContext';

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange(newSession => {
      setSession(newSession);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const session = await auth.signIn(email, password);
      addNotification('success', 'Signed in successfully');
      return session;
    } catch (error) {
      addNotification('error', 'Failed to sign in');
      throw error;
    }
  }, [addNotification]);

  return {
    session,
    loading,
    signIn,
    signOut: auth.signOut,
  };
}