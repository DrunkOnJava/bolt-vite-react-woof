import React, { useState } from 'react';
import { User, LogOut, Sun, Moon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { MOCK_ACCOUNTS } from '../types';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, switchUser } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{currentUser.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
          </div>

          <div className="px-4 py-2 border-b dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Switch Account</p>
            {MOCK_ACCOUNTS.map(account => (
              <button
                key={account.id}
                onClick={() => {
                  switchUser(account.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2 py-1 rounded-md text-sm ${
                  currentUser.id === account.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {account.avatar ? (
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span>{account.name}</span>
                </div>
              </button>
            ))}
          </div>

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
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}