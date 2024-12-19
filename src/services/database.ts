import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Tables = Database['public']['Tables'];

export const db = {
  medications: {
    async list(patientId: string) {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(medication: Tables['medications']['Insert']) {
      const { data, error } = await supabase
        .from('medications')
        .insert([medication])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Tables['medications']['Update']) {
      const { data, error } = await supabase
        .from('medications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  },

  pickups: {
    async list(medicationId: string) {
      const { data, error } = await supabase
        .from('pickups')
        .select('*')
        .eq('medication_id', medicationId)
        .order('pickup_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(pickup: Tables['pickups']['Insert']) {
      const { data, error } = await supabase
        .from('pickups')
        .insert([pickup])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  },

  receipts: {
    async list(patientId: string) {
      const { data, error } = await supabase
        .from('receipts')
        .select('*, medications(name)')
        .eq('patient_id', patientId)
        .order('transaction_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(receipt: Tables['receipts']['Insert']) {
      const { data, error } = await supabase
        .from('receipts')
        .insert([receipt])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  },
};