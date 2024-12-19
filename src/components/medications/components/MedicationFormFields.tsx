import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface MedicationFormFieldsProps {
  formData: {
    weeklyDosage: string;
    monthlyDosage: string;
    weeklyVolume: string;
    monthlyVolume: string;
    tier: string;
    price: string;
    contactInfo: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MedicationFormFields({
  formData,
  errors,
  onChange,
}: MedicationFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Weekly Dosage"
          value={formData.weeklyDosage}
          onChange={e => onChange('weeklyDosage', e.target.value)}
          error={errors.weeklyDosage}
          placeholder="e.g., 0.5mg"
          required
        />
        <Input
          label="Monthly Dosage"
          value={formData.monthlyDosage}
          onChange={e => onChange('monthlyDosage', e.target.value)}
          error={errors.monthlyDosage}
          placeholder="e.g., 2mg"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Weekly Volume"
          value={formData.weeklyVolume}
          onChange={e => onChange('weeklyVolume', e.target.value)}
          error={errors.weeklyVolume}
          placeholder="e.g., 0.2ml"
          required
        />
        <Input
          label="Monthly Volume"
          value={formData.monthlyVolume}
          onChange={e => onChange('monthlyVolume', e.target.value)}
          error={errors.monthlyVolume}
          placeholder="e.g., 0.8ml"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Tier"
          value={formData.tier}
          onChange={e => onChange('tier', e.target.value)}
          error={errors.tier}
          options={[
            { value: 'Tier 1', label: 'Tier 1' },
            { value: 'Tier 2', label: 'Tier 2' },
            { value: 'Tier 3', label: 'Tier 3' },
          ]}
          required
        />
        <Input
          label="Price"
          value={formData.price}
          onChange={e => onChange('price', e.target.value)}
          error={errors.price}
          placeholder="e.g., $200.00"
          required
        />
      </div>

      <Input
        label="Contact Info"
        value={formData.contactInfo}
        onChange={e => onChange('contactInfo', e.target.value)}
        error={errors.contactInfo}
        placeholder="Provider name"
        required
      />
    </div>
  );
}