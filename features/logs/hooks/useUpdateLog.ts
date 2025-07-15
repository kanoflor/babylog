import { useUserStore } from '@/stores/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLog } from '../api/updateLog';
import type { LogData } from '../types';

export const useUpdateLog = () => {
  const queryClient = useQueryClient();
  const user = useUserStore(s => s.user);

  return useMutation({
    mutationFn: ({
      logId,
      updates,
    }: {
      logId: string;
      updates: { loggedAt?: number; data?: LogData; memo?: string };
    }) => updateLog(logId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs', user.uid] });
    },
    onError: error => {
      throw error;
    },
  });
};
