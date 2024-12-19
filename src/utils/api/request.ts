import { ApiError } from './error';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(
        response.statusText,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error'
    );
  }
}