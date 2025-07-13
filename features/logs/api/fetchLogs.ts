import { db } from '@/lib/firebase';
import { LogEntry } from '@/stores/useLogStore';
import { endOfDay, startOfDay } from 'date-fns';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchLogs = async (
  uid: string,
  loggedAt?: Date | number
): Promise<LogEntry[]> => {
  const logsRef = collection(db, 'logs');
  const loggedAtDate = loggedAt ? new Date(loggedAt) : undefined;

  const q = loggedAtDate
    ? query(
        logsRef,
        where('uid', '==', uid),
        where('loggedAt', '>=', startOfDay(loggedAtDate).getTime()),
        where('loggedAt', '<=', endOfDay(loggedAtDate).getTime())
      )
    : query(logsRef, where('uid', '==', uid));

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      doc => ({ id: doc.id, ...doc.data() }) as LogEntry
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
