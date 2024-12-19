import React from 'react';
import { LogOut, Sun, Moon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAccountSwitcher } from './UserAccountSwitcher';

interface UserMenuDropdownProps {
  onClose: () => void;
}

export function UserMenuDropdown({ onClose }: UserMenuDropdownProps) {
  const { currentUser } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
      <div className="px-4 py-2 border-b dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {currentUser.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentUser.email}
        </p>
      </div>

      <UserAccountSwitcher onSelect={onClose} />

      <button
        onClick={toggleTheme}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
      >
        {theme === 'light' ? (
          <>
            <Moon className="h-4 w-4" />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <Sun className="h-4 w-4" />
            <span>Light Mode</span>
          </>
        )}
      </button>

      <button
        onClick={() => {
          // Implement logout logic
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}