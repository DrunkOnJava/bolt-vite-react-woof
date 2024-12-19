import { supabase } from '../supabase';
import type { MedicationPickup } from '../../types/medication';

export const pickupsApi = {
  async getAll(medicationId: string): Promise<MedicationPickup[]> {
    const { data, error } = await supabase
      .from('pickups')
      .select('*')
      .eq('medication_id', medicationId)
      .order('pickup_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(pickup: Omit<MedicationPickup, 'id'>) {
    const { data, error } = await supabase
      .from('pickups')
      .insert([pickup])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};