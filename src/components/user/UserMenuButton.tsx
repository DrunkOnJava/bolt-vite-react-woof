import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface UserMenuButtonProps {
  onClick: () => void;
}

export function UserMenuButton({ onClick }: UserMenuButtonProps) {
  const { currentUser } = useUser();

  return (
    <button
      onClick={onClick}
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
  );
}