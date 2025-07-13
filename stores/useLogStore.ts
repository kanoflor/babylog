import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAsyncStorage } from './storage';

export type LogEntry = {
  id: string;
  category: string;
  loggedAt: number; // Time when the log was logged
  createdAt: number; // Time when the log was created
  memo?: string;
  author?: string;
};

type LogEntryInput = Omit<LogEntry, 'id' | 'createdAt'>;

type LogState = {
  logs: LogEntry[];
  addLog: (log: LogEntryInput) => void;
  deleteLog: (id: string) => void;
};

export const useLogStore = create<LogState>()(
  persist(
    (set, get) => ({
      logs: [],
      addLog: log =>
        set({
          logs: [
            ...get().logs,
            { ...log, id: Date.now().toString(), createdAt: Date.now() },
          ],
        }),
      deleteLog: id => set({ logs: get().logs.filter(log => log.id !== id) }),
    }),
    {
      name: 'babylog-storage',
      storage: createAsyncStorage(),
    }
  )
);
