import { useAuthListener } from '@/features/auth/hooks/useAuthListener';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { router, Slot } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';

export default function RootLayout() {
  const { user, loading } = useAuthListener();

  useEffect(() => {
    // Should this be in the useAuthListener hook?
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) return <Text>Loading...</Text>;

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
