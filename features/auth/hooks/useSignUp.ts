import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api/signUp';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
