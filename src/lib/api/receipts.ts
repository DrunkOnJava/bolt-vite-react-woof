import { supabase } from '../supabase';
import type { Receipt } from '../../types/receipt';

export const receiptsApi = {
  async getAll(patientId: string): Promise<Receipt[]> {
    const { data, error } = await supabase
      .from('receipts')
      .select('*, medications(name)')
      .eq('patient_id', patientId)
      .order('transaction_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(receipt: Omit<Receipt, 'id'>) {
    const { data, error } = await supabase
      .from('receipts')
      .insert([receipt])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async uploadDocument(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(path, file);
    if (error) throw error;
    return data;
  },
};