import { db } from '@/lib/firebase';
import type { LogEntry } from '@/stores/useLogStore';
import { doc, updateDoc } from 'firebase/firestore';

export const updateLog = async (logId: string, updates: Partial<LogEntry>) => {
  const logRef = doc(db, 'logs', logId);
  await updateDoc(logRef, updates);
};
