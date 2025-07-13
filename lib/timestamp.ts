/**
 * Timestamp utilities for consistent date/time handling
 * All timestamps are stored as Unix timestamps in milliseconds
 */

/**
 * Get current timestamp in milliseconds
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Convert Date to timestamp
 */
export const dateToTimestamp = (date: Date): number => {
  return date.getTime();
};

/**
 * Convert timestamp to Date
 */
export const timestampToDate = (timestamp: number): Date => {
  return new Date(timestamp);
};

/**
 * Check if a value is a valid timestamp
 */
export const isValidTimestamp = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && value > 0;
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (
  timestamp: number,
  format: string = 'HH:mm'
): string => {
  const date = timestampToDate(timestamp);
  // You can use date-fns format here or any other date formatting library
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
