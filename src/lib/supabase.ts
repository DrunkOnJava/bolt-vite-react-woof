import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import { config } from '../config';

// Use config values with fallbacks for development
const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});