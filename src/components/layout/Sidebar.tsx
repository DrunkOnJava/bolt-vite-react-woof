import React from 'react';
import { useLocation } from 'react-router-dom';
import { PatientSidebar } from './PatientSidebar';
import { ProviderSidebar } from './ProviderSidebar';

interface SidebarProps {
  isProvider: boolean;
}

export function Sidebar({ isProvider }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-[calc(100vh-4rem)] shadow-lg">
      <nav className="mt-8 px-4">
        {isProvider ? <ProviderSidebar /> : <PatientSidebar />}
      </nav>
    </aside>
  );
}