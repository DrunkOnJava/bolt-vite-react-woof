import React from 'react';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import type { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  onMessageSelect: (message: Message) => void;
}

export default function MessageList({ messages, onMessageSelect }: MessageListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-4 ${
            !message.read ? 'bg-blue-50' : ''
          }`}
          onClick={() => onMessageSelect(message)}
        >
          <div className="flex-shrink-0">
            <MessageSquare className={`h-5 w-5 ${!message.read ? 'text-blue-500' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                {message.subject}
              </p>
              <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleDateString()}</p>
            </div>
            <p className="text-sm text-gray-500 truncate">{message.content}</p>
          </div>
          <div className="flex-shrink-0 flex space-x-2">
            <button className="text-gray-400 hover:text-yellow-500">
              <Star className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-red-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}