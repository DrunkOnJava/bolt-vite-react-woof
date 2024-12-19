import React, { useState } from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import { EditableCard } from '../EditableCard';
import { EditableField } from '../EditableField';
import { useNotifications } from '../../../../context/NotificationContext';
import type { Patient } from '../../../../types/patient';

interface PersonalInfoCardProps {
  patient: Patient;
  onUpdate: (updates: Partial<Patient>) => void;
}

export function PersonalInfoCard({ patient, onUpdate }: PersonalInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: patient.firstName,
    lastName: patient.lastName || '',
    email: patient.email || '',
    phone: patient.phone || '',
    address: patient.address || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addNotification } = useNotifications();

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      setIsEditing(false);
      setErrors({});
      addNotification('success', 'Personal information updated successfully');
    } catch (error) {
      setErrors({ submit: 'Failed to update information' });
    }
  };

  return (
    <EditableCard
      title="Personal Information"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => {
        setFormData({
          firstName: patient.firstName,
          lastName: patient.lastName || '',
          email: patient.email || '',
          phone: patient.phone || '',
          address: patient.address || '',
        });
        setIsEditing(false);
        setErrors({});
      }}
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <User className="h-5 w-5 text-gray-400 mt-1" />
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
            />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <EditableField
              label="Email Address"
              value={formData.email}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              type="email"
              error={errors.email}
            />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <EditableField
              label="Contact Number"
              value={formData.phone}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
              type="tel"
              error={errors.phone}
            />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <EditableField
              label="Home Address"
              value={formData.address}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
              type="textarea"
              error={errors.address}
            />
          </div>
        </div>
      </div>
    </EditableCard>
  );
}