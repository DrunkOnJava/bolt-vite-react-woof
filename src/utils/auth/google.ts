import { AuthSession } from '../../types/auth';

export function validateGoogleToken(token: string): Promise<AuthSession> {
  // In a real application, this would verify the token with Google's OAuth2 service
  // For this example, we'll assume the token is valid and return a mock session
  return Promise.resolve({
    user: {
      id: 'google-user-id',
      email: 'user@example.com',
      role: 'patient',
      emailVerified: true,
      metadata: {
        name: 'Google User',
        avatar_url: 'https://example.com/avatar.jpg',
      },
    },
    accessToken: token,
    refreshToken: null,
  });
}

export function parseGoogleUser(response: any): Partial<AuthSession['user']> {
  return {
    email: response.email,
    metadata: {
      name: response.name,
      avatar_url: response.picture,
    },
  };
}