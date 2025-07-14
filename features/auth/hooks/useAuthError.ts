import { useState } from 'react';

export const useAuthError = () => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return {
    error,
    clearError,
    handleError,
  };
};
