import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useMessages } from '../../../hooks/useMessages';
import { formatDate } from '../../../utils/date';
import { Button } from '../../ui/Button';
import { Link } from 'react-router-dom';

export function MessagesPreviewCard() {
  const { messages } = useMessages();
  const recentMessages = messages.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
        <Link to="/messages">
          <Button variant="ghost" size="sm" className="text-blue-600">
            <span className="mr-1">View All</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {recentMessages.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No recent messages</p>
        ) : (
          recentMessages.map(message => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{message.subject}</p>
                <p className="text-sm text-gray-500 truncate">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(message.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}