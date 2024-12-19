import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { MessagePreview } from '../../components/messages/MessagePreview';
import { MessageComposer } from '../../components/messages/MessageComposer';
import { MessageDetail } from '../../components/messages/MessageDetail';
import { useMessages } from '../../hooks/useMessages';
import type { Message } from '../../types';

const mockRecipients = [
  { id: 'provider1', name: 'Dr. Sarah Wilson' },
  { id: 'provider2', name: 'Dr. Michael Chen' },
];

export default function MessagesPage() {
  const [showCompose, setShowCompose] = useState(false);
  const {
    messages,
    selectedMessage,
    handleMessageSelect,
    handleMessageSend,
    handleMessageDelete,
  } = useMessages([
    {
      id: '1',
      senderId: 'provider1',
      receiverId: 'patient1',
      subject: 'Test Results Available',
      content: 'Your recent lab results are now available for review.',
      timestamp: new Date().toISOString(),
      read: false,
    },
  ]);

  if (selectedMessage) {
    return (
      <div className="space-y-6">
        <MessageDetail
          message={selectedMessage}
          onBack={() => handleMessageSelect(null)}
          onReply={() => setShowCompose(true)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <Button
          onClick={() => setShowCompose(true)}
          icon={<Plus className="h-5 w-5" />}
        >
          New Message
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No messages to display
          </div>
        ) : (
          messages.map(message => (
            <MessagePreview
              key={message.id}
              message={message}
              onSelect={handleMessageSelect}
              onDelete={handleMessageDelete}
            />
          ))
        )}
      </div>

      {showCompose && (
        <MessageComposer
          onClose={() => setShowCompose(false)}
          onSend={handleMessageSend}
          recipients={mockRecipients}
        />
      )}
    </div>
  );
}