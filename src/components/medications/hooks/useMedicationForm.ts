import { useState, useCallback } from 'react';
import type { Medication } from '../../../types/medication';
import { validateMedicationInfo } from '../../../utils/validation';
import { useNotifications } from '../../../context/NotificationContext';

export function useMedicationForm(initialData?: Partial<Medication>) {
  const [formData, setFormData] = useState({
    weeklyDosage: initialData?.weeklyDosage || '',
    monthlyDosage: initialData?.monthlyDosage || '',
    weeklyVolume: initialData?.weeklyVolume || '',
    monthlyVolume: initialData?.monthlyVolume || '',
    tier: initialData?.tier || 'Tier 1',
    price: initialData?.price || '',
    contactInfo: initialData?.contactInfo || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addNotification } = useNotifications();

  const validateForm = useCallback(() => {
    const validationErrors = validateMedicationInfo(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const handleSubmit = useCallback(async (onSubmit: (data: typeof formData) => Promise<void>) => {
    if (!validateForm()) {
      addNotification('error', 'Please fix the form errors');
      return false;
    }

    try {
      await onSubmit(formData);
      addNotification('success', 'Medication updated successfully');
      return true;
    } catch (error) {
      addNotification('error', 'Failed to update medication');
      return false;
    }
  }, [formData, validateForm, addNotification]);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}