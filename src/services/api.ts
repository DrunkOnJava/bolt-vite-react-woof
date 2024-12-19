import { supabase } from '../lib/supabase';
import type { AuthUser, Medication, Patient, Receipt } from '../types';

export const api = {
  auth: {
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    resetPassword: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },
  },
  
  medications: {
    getAll: async (patientId: string): Promise<Medication[]> => {
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);
      if (error) throw error;
      return data;
    },
    create: async (medication: Omit<Medication, 'id'>) => {
      const { data, error } = await supabase
        .from('medications')
        .insert([medication])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: Partial<Medication>) => {
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

  patients: {
    getAll: async (): Promise<Patient[]> => {
      const { data, error } = await supabase
        .from('patients')
        .select('*');
      if (error) throw error;
      return data;
    },
    getById: async (id: string): Promise<Patient> => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    update: async (id: string, updates: Partial<Patient>) => {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  receipts: {
    getAll: async (patientId: string): Promise<Receipt[]> => {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('patient_id', patientId);
      if (error) throw error;
      return data;
    },
    create: async (receipt: Omit<Receipt, 'id'>) => {
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