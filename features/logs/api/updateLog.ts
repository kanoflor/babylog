import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { LogEntry } from '../types';

export const updateLog = async (logId: string, updates: Partial<LogEntry>) => {
  const logRef = doc(db, 'logs', logId);
  await updateDoc(logRef, updates);
};
