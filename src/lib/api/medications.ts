import { supabase } from '../supabase';
import type { Medication } from '../../types/medication';

export const medicationsApi = {
  async getAll(patientId: string): Promise<Medication[]> {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('patient_id', patientId);
    if (error) throw error;
    return data;
  },

  async create(medication: Omit<Medication, 'id'>) {
    const { data, error } = await supabase
      .from('medications')
      .insert([medication])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Medication>) {
    const { data, error } = await supabase
      .from('medications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};