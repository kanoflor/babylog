import { isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { LogEntry, useLogStore } from '../../../stores/useLogStore';

export const useLogsByDate = (date: Date): LogEntry[] => {
  const allLogs = useLogStore(state => state.logs);

  const filteredLogs = useMemo(() => {
    return allLogs
      .filter(log => isSameDay(new Date(log.loggedAt), date))
      .sort((a, b) => a.loggedAt - b.loggedAt); // Sort by loggedAt in ascending order
  }, [allLogs, date]);

  return filteredLogs;
};

// TODO: Retrieve logs from server
// export const useLogsByDate = (date: Date): LogEntry[] => {
//   const { data, isLoading } = useQuery(['logs', date], () =>
//     fetchLogsFromServer(date)
//   );

//   return useMemo(() => {
//     return (data ?? []).sort((a, b) => a.loggedAt - b.loggedAt);
//   }, [data]);
// };