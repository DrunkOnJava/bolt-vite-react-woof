import React from 'react';
import { ArrowLeft, User, Clock } from 'lucide-react';
import type { Message } from '../../types';
import { formatDate, formatTime } from '../../utils/date';
import { Button } from '../ui/Button';

interface MessageDetailProps {
  message: Message;
  onBack: () => void;
  onReply?: () => void;
}

export function MessageDetail({ message, onBack, onReply }: MessageDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Messages
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">From: Dr. Sarah Wilson</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(message.timestamp)} at {formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
          {onReply && (
            <Button onClick={onReply} variant="secondary">
              Reply
            </Button>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">{message.subject}</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}