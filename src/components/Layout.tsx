import React from 'react';
import { useUser } from '../context/UserContext';
import { Navbar } from './layout/Navbar';
import { Sidebar } from './layout/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser } = useUser();
  const isProvider = currentUser.role === 'provider';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar isProvider={isProvider} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}