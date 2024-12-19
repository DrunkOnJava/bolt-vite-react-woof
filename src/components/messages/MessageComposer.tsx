import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface MessageComposerProps {
  onClose: () => void;
  onSend: (message: { subject: string; content: string; receiverId: string }) => void;
  recipients: Array<{ id: string; name: string }>;
}

export function MessageComposer({ onClose, onSend, recipients }: MessageComposerProps) {
  const [formData, setFormData] = React.useState({
    subject: '',
    content: '',
    receiverId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          <Select
            label="To:"
            name="receiverId"
            value={formData.receiverId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select recipient' },
              ...recipients.map(r => ({ value: r.id, label: r.name }))
            ]}
            required
          />

          <Input
            label="Subject:"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}