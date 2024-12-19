import { DatabaseProvider } from './types';
import { SupabaseDatabaseProvider } from './providers/supabase';
import { FirebaseDatabaseProvider } from './providers/firebase';
import { config } from '../config';

export function createDatabaseProvider(): DatabaseProvider {
  switch (config.database.provider) {
    case 'supabase':
      return new SupabaseDatabaseProvider(config.database.config);
    case 'firebase':
      return new FirebaseDatabaseProvider(config.database.config);
    default:
      throw new Error(`Unsupported database provider: ${config.database.provider}`);
  }
}

export const db = createDatabaseProvider();