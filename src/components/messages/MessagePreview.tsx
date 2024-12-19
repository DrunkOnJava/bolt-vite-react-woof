import React from 'react';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import type { Message } from '../../types';
import { formatDate } from '../../utils/date';

interface MessagePreviewProps {
  message: Message;
  onSelect: (message: Message) => void;
  onStar?: (message: Message) => void;
  onDelete?: (message: Message) => void;
}

export function MessagePreview({ message, onSelect, onStar, onDelete }: MessagePreviewProps) {
  return (
    <div
      className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-4 ${
        !message.read ? 'bg-blue-50' : ''
      }`}
      onClick={() => onSelect(message)}
    >
      <div className="flex-shrink-0">
        <MessageSquare 
          className={`h-5 w-5 ${!message.read ? 'text-blue-500' : 'text-gray-400'}`} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
            {message.subject}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(message.timestamp)}
          </p>
        </div>
        <p className="text-sm text-gray-500 truncate">{message.content}</p>
      </div>
      <div className="flex-shrink-0 flex space-x-2">
        {onStar && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onStar(message);
            }}
            className="text-gray-400 hover:text-yellow-500"
          >
            <Star className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(message);
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}