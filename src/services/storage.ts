import { supabase } from '../lib/supabase';

export const storage = {
  receipts: {
    async upload(file: File, path: string) {
      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(path, file);
      
      if (error) throw error;
      return data;
    },

    async getUrl(path: string) {
      const { data } = supabase.storage
        .from('receipts')
        .getPublicUrl(path);
      
      return data.publicUrl;
    },

    async remove(path: string) {
      const { error } = await supabase.storage
        .from('receipts')
        .remove([path]);
      
      if (error) throw error;
    },
  },
};