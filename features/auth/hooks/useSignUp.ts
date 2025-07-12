import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { signUp } from '../api/signUp';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: ({ familyId }) => {
      Alert.alert('Sign up successful', `familyId: ${familyId}`);
    },
    onError: (err: any) => {
      Alert.alert('Failed to sign up', err.message ?? 'Unknown error');
    },
  });
};
