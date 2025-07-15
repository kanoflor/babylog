import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import type { LogData } from '../types';

export const updateLog = async (
  logId: string,
  updates: { loggedAt?: number; data?: LogData; memo?: string }
) => {
  const logRef = doc(db, 'logs', logId);
  await updateDoc(logRef, updates);
};
