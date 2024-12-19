import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Medication } from '../../types/medication';
import { calculateNextPickupDate } from '../../utils/medication';
import { formatDate } from '../../utils/date';

interface RecordPickupModalProps {
  medication: Medication;
  onSubmit: (data: {
    medicationId: string;
    pickupDate: string;
    quantity: number;
    notes?: string;
  }) => void;
  onClose: () => void;
}

export function RecordPickupModal({ medication, onSubmit, onClose }: RecordPickupModalProps) {
  const today = new Date().toISOString().split('T')[0];
  const nextPickup = calculateNextPickupDate(today);

  const [formData, setFormData] = useState({
    pickupDate: today,
    quantity: 1,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Record Medication Pickup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900">{medication.name}</h3>
          <p className="text-sm text-gray-500">{medication.dosage}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Pickup Date"
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              pickupDate: e.target.value
            }))}
            max={today}
            required
          />

          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              quantity: parseInt(e.target.value, 10)
            }))}
            min={1}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
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
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center text-sm text-blue-700">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Next pickup will be scheduled for: {formatDate(nextPickup)}</span>
            </div>
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
              Record Pickup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}