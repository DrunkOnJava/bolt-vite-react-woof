import { supabase } from '../supabase';
import type { Patient } from '../../types/patient';

export const patientsApi = {
  async getAll(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Patient>) {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};