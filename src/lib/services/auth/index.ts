import { AuthProvider } from './types';
import { SupabaseAuthProvider } from './providers/supabase';
import { FirebaseAuthProvider } from './providers/firebase';
import { config } from '../config';

// Factory function to create the appropriate auth provider
export function createAuthProvider(): AuthProvider {
  switch (config.auth.provider) {
    case 'supabase':
      return new SupabaseAuthProvider(config.auth.config);
    case 'firebase':
      return new FirebaseAuthProvider(config.auth.config);
    default:
      throw new Error(`Unsupported auth provider: ${config.auth.provider}`);
  }
}

// Export the singleton instance
export const auth = createAuthProvider();