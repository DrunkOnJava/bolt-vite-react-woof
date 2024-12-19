import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { Medication } from '../../types/medication';

interface AddMedicationFormProps {
  onSubmit: (medication: Omit<Medication, 'id'>) => void;
  onClose: () => void;
}

export function AddMedicationForm({ onSubmit, onClose }: AddMedicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    startDate: new Date().toISOString().split('T')[0],
    status: 'active' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add New Medication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Medication Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
          />

          <Input
            label="Frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

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
              Add Medication
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}