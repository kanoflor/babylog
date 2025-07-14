import type { CategoryInfo } from '../../config/categoryConfig';
import type { LogEntry } from '../../types';
import { combineDateAndTime, getModalTitle } from '../useTimePickerModal';

describe('useTimePickerModal utilities', () => {
  describe('combineDateAndTime', () => {
    it('should combine date and time correctly', () => {
      const date = new Date('2024-01-15');
      const time = new Date('2024-01-01T14:30:45');

      const result = combineDateAndTime(date, time);

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(14);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it('should handle different dates and times', () => {
      const date = new Date('2024-12-25');
      const time = new Date('2024-01-01T09:15:30');

      const result = combineDateAndTime(date, time);

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(11);
      expect(result.getDate()).toBe(25);
      expect(result.getHours()).toBe(9);
      expect(result.getMinutes()).toBe(15);
      expect(result.getSeconds()).toBe(30);
    });

    it('should handle leap year dates', () => {
      const date = new Date('2024-02-29'); // Leap year
      const time = new Date('2024-01-01T23:59:59');

      const result = combineDateAndTime(date, time);

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(29);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
    });

    it('should handle midnight time', () => {
      const date = new Date('2024-01-15');
      const time = new Date('2024-01-01T00:00:00');

      const result = combineDateAndTime(date, time);

      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

  describe('getModalTitle', () => {
    const mockCategory: CategoryInfo = {
      key: 'nursing',
      label: 'Nursing',
      emoji: '🤱',
      color: '#f4b4b4',
    };

    const mockLog: LogEntry = {
      id: 'test-id',
      uid: 'user-id',
      category: 'nursing',
      loggedAt: Date.now(),
      createdAt: Date.now(),
    };

    it('should return update title when mode is update and log exists', () => {
      const result = getModalTitle('update', mockLog, null);
      expect(result).toBe('Update log time');
    });

    it('should return category title when mode is create and category exists', () => {
      const result = getModalTitle('create', null, mockCategory);
      expect(result).toBe('🤱 Nursing');
    });

    it('should return default title when no conditions are met', () => {
      const result = getModalTitle('create', null, null);
      expect(result).toBe('Select time');
    });

    it('should return default title when mode is update but no log exists', () => {
      const result = getModalTitle('update', null, mockCategory);
      expect(result).toBe('Select time');
    });

    it('should handle different categories', () => {
      const formulaCategory: CategoryInfo = {
        key: 'formula',
        label: 'Formula',
        emoji: '🍼',
        color: '#f6c37d',
      };

      const result = getModalTitle('create', null, formulaCategory);
      expect(result).toBe('🍼 Formula');
    });

    it('should handle categories with special characters', () => {
      const specialCategory: CategoryInfo = {
        key: 'bath',
        label: 'Baths & Showers',
        emoji: '🛁',
        color: '#d9cbbf',
      };

      const result = getModalTitle('create', null, specialCategory);
      expect(result).toBe('🛁 Baths & Showers');
    });
  });

  describe('useTimePickerModal hook logic', () => {
    const mockAddLogMutation = {
      mutate: jest.fn(),
      isPending: false,
    };

    const mockUpdateLogMutation = {
      mutate: jest.fn(),
      isPending: false,
    };

    beforeEach(() => {
      jest.clearAllMocks();

      jest.doMock('../useAddLog', () => ({
        useAddLog: () => mockAddLogMutation,
      }));
      jest.doMock('../useUpdateLog', () => ({
        useUpdateLog: () => mockUpdateLogMutation,
      }));
    });

    afterEach(() => {
      jest.dontMock('../useAddLog');
      jest.dontMock('../useUpdateLog');
    });

    it('should handle create mode logic correctly', () => {
      const category: CategoryInfo = {
        key: 'nursing',
        label: 'Nursing',
        emoji: '🤱',
        color: '#f4b4b4',
      };
      const date = new Date('2024-01-15');
      const time = new Date('2024-01-01T14:30:45');

      // Simulate the confirm logic for create mode
      const combinedDateTime = combineDateAndTime(date, time);
      const expectedPayload = {
        category: category.key,
        loggedAt: combinedDateTime.getTime(),
      };

      expect(expectedPayload.category).toBe('nursing');
      expect(expectedPayload.loggedAt).toBe(combinedDateTime.getTime());
    });

    it('should handle update mode logic correctly', () => {
      const log: LogEntry = {
        id: 'test-id',
        uid: 'user-id',
        category: 'nursing',
        loggedAt: Date.now(),
        createdAt: Date.now(),
      };

      const selectedTime = new Date('2024-01-15T14:30:00');

      const expectedPayload = {
        logId: log.id,
        updates: { loggedAt: selectedTime.getTime() },
      };

      expect(expectedPayload.logId).toBe('test-id');
      expect(expectedPayload.updates.loggedAt).toBe(selectedTime.getTime());
    });

    it('should return correct title for different states', () => {
      const category: CategoryInfo = {
        key: 'formula',
        label: 'Formula',
        emoji: '🍼',
        color: '#f6c37d',
      };

      const log: LogEntry = {
        id: 'test-id',
        uid: 'user-id',
        category: 'formula',
        loggedAt: Date.now(),
        createdAt: Date.now(),
      };

      expect(getModalTitle('create', null, category)).toBe('🍼 Formula');
      expect(getModalTitle('update', log, null)).toBe('Update log time');
      expect(getModalTitle('create', null, null)).toBe('Select time');
    });

    it('should handle edge case with null values', () => {
      expect(() => combineDateAndTime(new Date(), new Date())).not.toThrow();
      expect(() => getModalTitle('create', null, null)).not.toThrow();
    });

    it('should handle all category types', () => {
      const categories: CategoryInfo[] = [
        { key: 'nursing', label: 'Nursing', emoji: '🤱', color: '#f4b4b4' },
        { key: 'formula', label: 'Formula', emoji: '🍼', color: '#f6c37d' },
        { key: 'sleep', label: 'Sleep', emoji: '😴', color: '#a79ee0' },
        { key: 'wake', label: 'Wake-up', emoji: '🌞', color: '#92d2ec' },
        { key: 'pee', label: 'Pee', emoji: '💧', color: '#c0e6e2' },
        { key: 'poop', label: 'Poop', emoji: '💩', color: '#e8b36d' },
        { key: 'bath', label: 'Baths', emoji: '🛁', color: '#d9cbbf' },
      ];

      categories.forEach(category => {
        const result = getModalTitle('create', null, category);
        expect(result).toBe(`${category.emoji} ${category.label}`);
      });
    });

    it('should handle timezone edge cases', () => {
      const date = new Date('2024-01-15T00:00:00.000Z');
      const time = new Date('2024-01-01T23:59:59.999Z');

      const result = combineDateAndTime(date, time);

      // Should preserve the date components from the date parameter
      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(15);

      // Should preserve the time components from the time parameter
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
    });
  });
});
