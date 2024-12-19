import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { Receipt } from '../../types/receipt';

interface UploadReceiptModalProps {
  onClose: () => void;
  onUpload: (file: File, metadata: Partial<Receipt>) => Promise<void>;
}

export function UploadReceiptModal({ onClose, onUpload }: UploadReceiptModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    amount: '',
    description: '',
    paymentMethod: 'credit',
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      await onUpload(file, {
        ...metadata,
        amount: parseFloat(metadata.amount),
      });
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upload Receipt</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Receipt Document</label>
            <div className="mt-1">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                required
              />
            </div>
          </div>

          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={metadata.amount}
            onChange={(e) => setMetadata(prev => ({ ...prev, amount: e.target.value }))}
            required
          />

          <Input
            label="Description"
            value={metadata.description}
            onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
            required
          />

          <Select
            label="Payment Method"
            value={metadata.paymentMethod}
            onChange={(e) => setMetadata(prev => ({ ...prev, paymentMethod: e.target.value }))}
            options={[
              { value: 'credit', label: 'Credit Card' },
              { value: 'debit', label: 'Debit Card' },
              { value: 'cash', label: 'Cash' },
              { value: 'insurance', label: 'Insurance' },
            ]}
          />

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isUploading}
              icon={<Upload className="h-4 w-4" />}
            >
              Upload Receipt
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}