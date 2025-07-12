import { useMemo } from 'react';
import { LogEntry, useLogStore } from '../../../stores/useLogStore';

export const useSortedLogs = (): LogEntry[] => {
  const logs = useLogStore((s) => s.logs);

  const sorted = useMemo(() => {
    return [...logs].sort((a, b) => a.loggedAt - b.loggedAt);
  }, [logs]);

  return sorted;
};
