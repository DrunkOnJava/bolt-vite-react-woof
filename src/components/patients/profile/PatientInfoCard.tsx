import React, { useState } from 'react';
import { User } from 'lucide-react';
import { EditableCard } from './EditableCard';
import { EditableField } from './EditableField';
import { useNotifications } from '../../../context/NotificationContext';
import { validatePatientInfo } from '../../../utils/validation';
import type { Patient } from '../../../types/patient';

interface PatientInfoCardProps {
  patient: Patient;
  onUpdate: (updates: Partial<Patient>) => void;
}

export function PatientInfoCard({ patient, onUpdate }: PatientInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName || '',
    email: patient.email || '',
    phone: patient.phone || '',
    notes: patient.notes || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addNotification } = useNotifications();

  const handleSave = () => {
    const validationErrors = validatePatientInfo(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onUpdate(formData);
    setIsEditing(false);
    setErrors({});
    addNotification('success', 'Patient information updated successfully');
  };

  const handleCancel = () => {
    setFormData({
      firstName: patient.firstName,
      lastName: patient.lastName || '',
      email: patient.email || '',
      phone: patient.phone || '',
      notes: patient.notes || ''
    });
    setIsEditing(false);
    setErrors({});
  };

  return (
    <EditableCard
      title="Patient Information"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-400" />
          <div className="grid grid-cols-2 gap-4 flex-1">
            <EditableField
              label="First Name"
              value={formData.firstName}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
              required
              error={errors.firstName}
            />
            <EditableField
              label="Last Name"
              value={formData.lastName}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
              error={errors.lastName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <EditableField
            label="Email"
            value={formData.email}
            isEditing={isEditing}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            type="email"
            error={errors.email}
          />
          <EditableField
            label="Phone"
            value={formData.phone}
            isEditing={isEditing}
            onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            type="tel"
            error={errors.phone}
          />
        </div>

        {(isEditing || formData.notes) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            {isEditing ? (
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {formData.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </EditableCard>
  );
}