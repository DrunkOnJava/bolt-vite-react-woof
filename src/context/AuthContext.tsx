import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { signInWithEmailPassword, signInWithGoogle, signOut } from '../lib/auth/providers';
import { handleAuthError } from '../lib/auth/errors';
import type { AuthUser, AuthSession } from '../types/auth';
import { useNotifications } from './NotificationContext';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: AuthUser | null;
    loading: boolean;
  }>({
    user: null,
    loading: true,
  });

  const { addNotification } = useNotifications();

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata.role || 'patient',
          emailVerified: session.user.email_confirmed_at !== null,
          metadata: {
            name: session.user.user_metadata.full_name,
            avatar_url: session.user.user_metadata.avatar_url,
          },
        };
        setState({ user, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata.role || 'patient',
          emailVerified: session.user.email_confirmed_at !== null,
          metadata: {
            name: session.user.user_metadata.full_name,
            avatar_url: session.user.user_metadata.avatar_url,
          },
        };
        setState({ user, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailPassword(email, password);
      addNotification('success', 'Signed in successfully');
    } catch (error) {
      const message = handleAuthError(error);
      addNotification('error', message);
      throw error;
    }
  }, [addNotification]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      addNotification('success', 'Signed in with Google successfully');
    } catch (error) {
      const message = handleAuthError(error);
      addNotification('error', message);
      throw error;
    }
  }, [addNotification]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      addNotification('success', 'Signed out successfully');
    } catch (error) {
      const message = handleAuthError(error);
      addNotification('error', message);
      throw error;
    }
  }, [addNotification]);

  const value = {
    user: state.user,
    loading: state.loading,
    signIn: handleSignIn,
    signInWithGoogle: handleGoogleSignIn,
    signOut: handleSignOut,
    // ... other auth methods
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}