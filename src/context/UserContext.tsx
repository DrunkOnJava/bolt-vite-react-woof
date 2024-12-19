import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, MOCK_ACCOUNTS } from '../types';
import { useNotifications } from './NotificationContext';

interface UserContextType {
  currentUser: UserAccount;
  switchUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : MOCK_ACCOUNTS[0]; // Default to first provider
  });
  
  const { addNotification } = useNotifications();

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (userId: string) => {
    const user = MOCK_ACCOUNTS.find(account => account.id === userId);
    if (user) {
      setCurrentUser(user);
      addNotification('success', `Switched to ${user.name}'s account`);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}