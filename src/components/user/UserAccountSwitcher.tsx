import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { MOCK_ACCOUNTS } from '../../types';

interface UserAccountSwitcherProps {
  onSelect: () => void;
}

export function UserAccountSwitcher({ onSelect }: UserAccountSwitcherProps) {
  const { currentUser, switchUser } = useUser();

  // Group accounts by role
  const providerAccounts = MOCK_ACCOUNTS.filter(account => account.role === 'provider');
  const patientAccounts = MOCK_ACCOUNTS.filter(account => account.role === 'patient');

  const renderAccount = (account: typeof MOCK_ACCOUNTS[number]) => (
    <button
      key={account.id}
      onClick={() => {
        switchUser(account.id);
        onSelect();
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
  );

  return (
    <div className="px-4 py-2 space-y-4">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Provider Account
        </p>
        {providerAccounts.map(renderAccount)}
      </div>

      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Patient Accounts
        </p>
        <div className="max-h-64 overflow-y-auto space-y-1">
          {patientAccounts.map(renderAccount)}
        </div>
      </div>
    </div>
  );
}