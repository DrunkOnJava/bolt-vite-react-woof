import { z } from 'zod';

// Service configuration schema
const ServiceConfigSchema = z.object({
  enabled: z.boolean(),
  url: z.string().url().optional(),
  apiKey: z.string().min(1).optional(),
  region: z.string().optional(),
});

// Main configuration schema
const ConfigSchema = z.object({
  auth: z.object({
    provider: z.enum(['supabase', 'firebase', 'custom']),
    config: ServiceConfigSchema,
  }),
  database: z.object({
    provider: z.enum(['supabase', 'firebase']),
    config: ServiceConfigSchema,
  }),
  storage: z.object({
    provider: z.enum(['supabase', 'firebase', 's3']),
    config: ServiceConfigSchema,
  }),
  analytics: z.object({
    provider: z.enum(['firebase', 'segment', 'custom']),
    config: ServiceConfigSchema,
  }),
});

// Environment-specific configurations
const configs = {
  development: {
    auth: {
      provider: 'supabase',
      config: {
        enabled: true,
        url: import.meta.env.VITE_SUPABASE_URL,
        apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
    },
    database: {
      provider: 'supabase',
      config: {
        enabled: true,
        url: import.meta.env.VITE_SUPABASE_URL,
        apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
    },
    storage: {
      provider: 'supabase',
      config: {
        enabled: true,
        url: import.meta.env.VITE_SUPABASE_URL,
        apiKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
    },
    analytics: {
      provider: 'firebase',
      config: {
        enabled: false,
      },
    },
  },
  production: {
    // Production config would be similar but with different values
  },
} as const;

// Get environment-specific config
const environment = import.meta.env.MODE || 'development';
export const config = ConfigSchema.parse(configs[environment as keyof typeof configs]);