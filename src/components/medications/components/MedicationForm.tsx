import React from 'react';
import { Button } from '../../ui/Button';
import { MedicationFormFields } from './MedicationFormFields';
import { useMedicationForm } from '../hooks/useMedicationForm';
import type { Medication } from '../../../types/medication';

interface MedicationFormProps {
  medication?: Partial<Medication>;
  onSubmit: (data: Partial<Medication>) => Promise<void>;
  onCancel: () => void;
}

export function MedicationForm({ medication, onSubmit, onCancel }: MedicationFormProps) {
  const { formData, errors, handleChange, handleSubmit } = useMedicationForm(medication);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(onSubmit);
    }}>
      <MedicationFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      <div className="mt-6 flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {medication ? 'Update' : 'Create'} Medication
        </Button>
      </div>
    </form>
  );
}