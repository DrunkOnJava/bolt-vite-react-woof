import React from 'react';
import { UserMenuButton } from './UserMenuButton';
import { UserMenuDropdown } from './UserMenuDropdown';
import { useToggle } from '../../hooks/useToggle';

export default function UserMenu() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div className="relative">
      <UserMenuButton onClick={toggleOpen} />
      {isOpen && <UserMenuDropdown onClose={() => toggleOpen(false)} />}
    </div>
  );
}