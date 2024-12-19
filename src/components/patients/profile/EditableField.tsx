import React from 'react';
import { Input } from '../../ui/Input';

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
}

export function EditableField({
  label,
  value,
  isEditing,
  onChange,
  type = 'text',
  required = false,
  error
}: EditableFieldProps) {
  if (isEditing) {
    return (
      <Input
        label={label}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        error={error}
      />
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || 'Not specified'}</p>
    </div>
  );
}