import type { LogEntry } from '@/stores/useLogStore';
import { useUserStore } from '@/stores/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLog } from '../api/updateLog';

export const useUpdateLog = () => {
  const queryClient = useQueryClient();
  const uid = useUserStore(s => s.uid);

  return useMutation({
    mutationFn: ({
      logId,
      updates,
    }: {
      logId: string;
      updates: Partial<LogEntry>;
    }) => updateLog(logId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs', uid] });
    },
    onError: error => {
      throw error;
    },
  });
};
