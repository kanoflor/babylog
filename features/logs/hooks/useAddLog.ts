import { useUserStore } from '@/stores/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLog } from '../api/createLog';
import type { LogEntry } from '../types';

export const useAddLog = () => {
  const queryClient = useQueryClient();
  const user = useUserStore(s => s.user);
  const author = 'mather'; // TODO: Replace with user name in the future

  return useMutation({
    mutationFn: (log: Omit<LogEntry, 'id' | 'createdAt' | 'uid' | 'author'>) =>
      createLog({ ...log, author, uid: user.uid! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs', user.uid] });
    },
    onError: error => {
      throw error;
    },
  });
};
