import { addDays, startOfDay } from 'date-fns';
import { useState } from 'react';

/**
 * Date navigation logic (initial date: today)
 */
export const useDateNavigation = () => {
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  const goToPreviousDate = () => setSelectedDate(prev => addDays(prev, -1));
  const goToNextDate = () => setSelectedDate(prev => addDays(prev, 1));

  return {
    selectedDate,
    setSelectedDate,
    goToPreviousDate,
    goToNextDate,
  };
};
