import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface ComposeMessageProps {
  onClose: () => void;
  onSend: (message: { subject: string; content: string; receiverId: string }) => void;
  recipients: Array<{ id: string; name: string }>;
}

export default function ComposeMessage({ onClose, onSend, recipients }: ComposeMessageProps) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ subject, content, receiverId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">To:</label>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select recipient</option>
              {recipients.map((recipient) => (
                <option key={recipient.id} value={recipient.id}>
                  {recipient.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}