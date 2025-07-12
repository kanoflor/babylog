import { useUserStore } from '@/stores/useUserStore';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { loginWithEmail } from '../api/login';

export const useLogin = () => {
  const login = useUserStore(s => s.login);

  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: uid => {
      login(uid);
    },
    onError: (err: any) => {
      Alert.alert('Failed to login', err.message || 'Unknown error');
    },
  });
};
