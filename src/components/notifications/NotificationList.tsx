import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-400" />,
  error: <AlertCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
};

const styles = {
  success: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100',
  error: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100',
  info: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
};

export function NotificationList() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={`
            flex items-center justify-between p-4 rounded-lg shadow-lg
            max-w-sm w-full animate-slide-in
            ${styles[type]}
          `}
        >
          <div className="flex items-center space-x-3">
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => removeNotification(id)}
            className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}