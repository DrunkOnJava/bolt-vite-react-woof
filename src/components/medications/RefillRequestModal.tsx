import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Medication } from '../../types/medication';
import { formatDate } from '../../utils/date';

interface RefillRequestModalProps {
  medication: Medication;
  onSubmit: (data: {
    medicationId: string;
    preferredDate: string;
    notes?: string;
  }) => void;
  onClose: () => void;
}

export function RefillRequestModal({ medication, onSubmit, onClose }: RefillRequestModalProps) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Start from tomorrow
  
  const [formData, setFormData] = useState({
    preferredDate: minDate.toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      medicationId: medication.id,
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Request Medication Refill</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900">{medication.name}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Last fill: {medication.lastFillDate}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Next due: {medication.refillDue}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Preferred Delivery Date"
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              preferredDate: e.target.value
            }))}
            min={minDate.toISOString().split('T')[0]}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                notes: e.target.value
              }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any special instructions or notes for your request..."
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
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}