import { LogEntry } from '../types';

/**
 * Get additional data for a log entry
 */
export const getAdditionalData = (entry: LogEntry): string | null => {
  switch (entry.category) {
    case 'formula':
      return entry.data?.formula?.amount !== undefined
        ? `${entry.data.formula.amount}ml`
        : null;
    default:
      return null;
  }
};
