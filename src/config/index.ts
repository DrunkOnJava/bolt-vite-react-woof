// Environment configuration with type safety and defaults
const env = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Development fallbacks
const devDefaults = {
  supabaseUrl: 'https://mock.supabase.co',
  supabaseAnonKey: 'mock-anon-key',
};

export const config = {
  env: env.isDevelopment ? 'development' : 'production',
  supabase: {
    url: env.supabaseUrl || (env.isDevelopment ? devDefaults.supabaseUrl : ''),
    anonKey: env.supabaseAnonKey || (env.isDevelopment ? devDefaults.supabaseAnonKey : ''),
  },
};