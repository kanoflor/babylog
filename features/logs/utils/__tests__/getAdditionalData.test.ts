import { LogEntry } from '../../types';
import { getAdditionalData } from '../getAdditionalData';

describe('getAdditionalData', () => {
  const baseEntry: Omit<LogEntry, 'category' | 'data'> = {
    id: 'test-id',
    uid: 'test-uid',
    loggedAt: Date.now(),
    createdAt: Date.now(),
  };

  describe('formula category', () => {
    it('should return formatted amount when formula data exists', () => {
      const entry: LogEntry = {
        ...baseEntry,
        category: 'formula',
        data: {
          formula: {
            amount: 120,
          },
        },
      };

      const result = getAdditionalData(entry);
      expect(result).toBe('120ml');
    });

    it('should return null when formula data is missing', () => {
      const entry: LogEntry = {
        ...baseEntry,
        category: 'formula',
        data: undefined,
      };

      const result = getAdditionalData(entry);
      expect(result).toBeNull();
    });

    it('should return null when formula amount is missing', () => {
      const entry: LogEntry = {
        ...baseEntry,
        category: 'formula',
        data: {
          formula: undefined,
        },
      };

      const result = getAdditionalData(entry);
      expect(result).toBeNull();
    });

    it('should handle zero amount', () => {
      const entry: LogEntry = {
        ...baseEntry,
        category: 'formula',
        data: {
          formula: {
            amount: 0,
          },
        },
      };

      const result = getAdditionalData(entry);
      expect(result).toBe('0ml');
    });
  });
});
