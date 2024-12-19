import React, { useState } from 'react';
import { Pill, Droplet, DollarSign } from 'lucide-react';
import { EditableCard } from '../EditableCard';
import { EditableField } from '../EditableField';
import { useNotifications } from '../../../../context/NotificationContext';
import type { Medication } from '../../../../types/medication';

interface MedicationCardProps {
  medication: Medication;
  onUpdate: (updates: Partial<Medication>) => void;
}

export function MedicationCard({ medication, onUpdate }: MedicationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    weeklyDosage: medication.weeklyDosage,
    monthlyDosage: medication.monthlyDosage,
    weeklyVolume: medication.weeklyVolume,
    monthlyVolume: medication.monthlyVolume,
    tier: medication.tier,
    price: medication.price,
  });
  const { addNotification } = useNotifications();

  const handleSave = async () => {
    try {
      await onUpdate(formData);
      setIsEditing(false);
      addNotification('success', 'Medication information updated successfully');
    } catch (error) {
      addNotification('error', 'Failed to update medication information');
    }
  };

  return (
    <EditableCard
      title="Medication Details"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={() => {
        setFormData({
          weeklyDosage: medication.weeklyDosage,
          monthlyDosage: medication.monthlyDosage,
          weeklyVolume: medication.weeklyVolume,
          monthlyVolume: medication.monthlyVolume,
          tier: medication.tier,
          price: medication.price,
        });
        setIsEditing(false);
      }}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Pill className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <EditableField
                  label="Weekly Dosage"
                  value={formData.weeklyDosage}
                  isEditing={isEditing}
                  onChange={(value) => setFormData(prev => ({ ...prev, weeklyDosage: value }))}
                  required
                />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Pill className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <EditableField
                  label="Monthly Dosage"
                  value={formData.monthlyDosage}
                  isEditing={isEditing}
                  onChange={(value) => setFormData(prev => ({ ...prev, monthlyDosage: value }))}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Droplet className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <EditableField
                  label="Weekly Volume"
                  value={formData.weeklyVolume}
                  isEditing={isEditing}
                  onChange={(value) => setFormData(prev => ({ ...prev, weeklyVolume: value }))}
                  required
                />
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Droplet className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <EditableField
                  label="Monthly Volume"
                  value={formData.monthlyVolume}
                  isEditing={isEditing}
                  onChange={(value) => setFormData(prev => ({ ...prev, monthlyVolume: value }))}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <EditableField
                label="Price"
                value={formData.price}
                isEditing={isEditing}
                onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
                required
              />
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Pill className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <EditableField
                label="Tier"
                value={formData.tier}
                isEditing={isEditing}
                onChange={(value) => setFormData(prev => ({ ...prev, tier: value as any }))}
                type="select"
                options={[
                  { value: 'Tier 1', label: 'Tier 1' },
                  { value: 'Tier 2', label: 'Tier 2' },
                  { value: 'Tier 3', label: 'Tier 3' },
                ]}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </EditableCard>
  );
}