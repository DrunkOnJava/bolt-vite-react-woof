export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public service: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export function handleServiceError(
  error: unknown,
  service: string
): ServiceError {
  if (error instanceof ServiceError) {
    return error;
  }

  if (error instanceof Error) {
    return new ServiceError(
      error.message,
      'UNKNOWN_ERROR',
      service,
      error
    );
  }

  return new ServiceError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    service,
    error
  );
}