import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}