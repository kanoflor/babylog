import { db } from '@/lib/firebase';
import { LogEntry } from '@/stores/useLogStore';
import { addDoc, collection } from 'firebase/firestore';

export const createLog = async (
  log: Omit<LogEntry, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const ref = await addDoc(collection(db, 'logs'), {
      ...log,
      createdAt: Date.now(),
    });
    return ref.id;
  } catch (error) {
    throw error;
  }
};
