import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { EditableCard } from '../EditableCard';
import { EditableField } from '../EditableField';
import { useNotifications } from '../../../../context/NotificationContext';
import type { Medication } from '../../../../types/medication';

interface DeliveryInfoCardProps {
  medication: Medication;
  onUpdate: (updates: Partial<Medication>) => void;
}

export function DeliveryInfoCard({ medication, onUpdate }: DeliveryInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    refillDue: medication.refillDue,
    lastFillDate: medication.lastFillDate,
    contactInfo: medication.contactInfo,
  });
  const { addNotification } = useNotifications();

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      setIsEditing(false);
      addNotification('success', 'Delivery information updated successfully');
    } catch (error) {
      addNotification('error', 'Failed to update delivery information');
    }
  };

  return (
    <EditableCard
      title="Delivery Information"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => {
        setFormData({
          refillDue: medication.refillDue,
          lastFillDate: medication.lastFillDate,
          contactInfo: medication.contactInfo,
        });
        setIsEditing(false);
      }}
    >
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-gray-400 mt-1" />
          <div className="grid grid-cols-2 gap-4 flex-1">
            <EditableField
              label="Last Fill Date"
              value={formData.lastFillDate}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, lastFillDate: value }))}
              type="date"
              required
            />
            <EditableField
              label="Next Refill Due"
              value={formData.refillDue}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, refillDue: value }))}
              type="date"
              required
            />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <EditableField
              label="Contact Info"
              value={formData.contactInfo}
              isEditing={isEditing}
              onChange={(value) => setFormData(prev => ({ ...prev, contactInfo: value }))}
              required
            />
          </div>
        </div>
      </div>
    </EditableCard>
  );
}