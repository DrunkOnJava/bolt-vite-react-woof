import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import UserMenu from '../user/UserMenu'; // Fix import to use default export

export function Navbar() {
  return (
    <nav className="bg-blue-600 dark:bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">HealthPortal</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}