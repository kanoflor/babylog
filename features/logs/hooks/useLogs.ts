import { useUserStore } from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../api/fetchLogs';

export const useLogs = (loggedAt?: Date | number) => {
  const user = useUserStore(s => s.user);
  const { uid } = user;

  return useQuery({
    queryKey: ['logs', uid, loggedAt ? new Date(loggedAt) : 'all'],
    queryFn: () => fetchLogs(uid!, loggedAt),
    enabled: !!uid,
  });
};
