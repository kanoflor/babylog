import { useUserStore } from '@/stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { fetchLogs } from '../api/fetchLogs';

export const useLogs = (loggedAt?: Date | number) => {
  const uid = useUserStore(s => s.uid);

  return useQuery({
    queryKey: ['logs', uid, loggedAt ? new Date(loggedAt) : 'all'],
    queryFn: () => fetchLogs(uid!, loggedAt),
    enabled: !!uid,
  });
};
