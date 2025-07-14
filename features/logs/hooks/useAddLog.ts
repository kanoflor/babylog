import { useUserStore } from '@/stores/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLog } from '../api/createLog';
import type { LogEntry } from '../types';

export const useAddLog = () => {
  const queryClient = useQueryClient();
  const uid = useUserStore(s => s.uid);
  const author = 'father'; // TODO: ユーザー名を取得する

  return useMutation({
    mutationFn: (log: Omit<LogEntry, 'id' | 'createdAt' | 'uid' | 'author'>) =>
      createLog({ ...log, author, uid: uid! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs', uid] });
    },
    onError: error => {
      throw error;
    },
  });
};
