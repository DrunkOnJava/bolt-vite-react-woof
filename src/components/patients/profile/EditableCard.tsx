import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { Button } from '../../ui/Button';

interface EditableCardProps {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function EditableCard({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  children
}: EditableCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onSave}
              icon={<Check className="h-4 w-4" />}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel}
              icon={<X className="h-4 w-4" />}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={onEdit}
            icon={<Pencil className="h-4 w-4" />}
          >
            Edit
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}