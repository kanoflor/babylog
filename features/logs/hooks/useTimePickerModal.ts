import { useState } from 'react';
import type { CategoryInfo } from '../config/categoryConfig';
import type { LogEntry } from '../types';
import { useAddLog } from './useAddLog';
import { useUpdateLog } from './useUpdateLog';

type TimePickerMode = 'create' | 'update';

export const combineDateAndTime = (date: Date, time: Date): Date => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds()
  );
};

export const getModalTitle = (
  mode: TimePickerMode,
  selectedLog: LogEntry | null,
  selectedCategory: CategoryInfo | null
): string => {
  if (mode === 'update' && selectedLog) {
    return 'Update log time';
  } else if (mode === 'create' && selectedCategory) {
    return `${selectedCategory.emoji} ${selectedCategory.label}`;
  }
  return 'Select time';
};

export const useTimePickerModal = () => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<TimePickerMode>('create');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(
    null
  );
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateLogMutation = useUpdateLog();
  const addLogMutation = useAddLog();

  const openForCreate = (category: CategoryInfo, date: Date) => {
    setMode('create');
    setSelectedCategory(category);
    setSelectedDate(date);
    setSelectedTime(new Date()); // Defaulted to current time
    setSelectedLog(null);
    setVisible(true);
  };

  const openForUpdate = (log: LogEntry) => {
    setMode('update');
    setSelectedLog(log);
    setSelectedTime(new Date(log.loggedAt));
    setSelectedCategory(null);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setSelectedLog(null);
    setSelectedCategory(null);
  };

  const confirm = () => {
    if (mode === 'update' && selectedLog) {
      updateLogMutation.mutate({
        logId: selectedLog.id,
        updates: { loggedAt: selectedTime.getTime() },
      });
    } else if (mode === 'create' && selectedCategory) {
      const combinedDateTime = combineDateAndTime(selectedDate, selectedTime);
      addLogMutation.mutate({
        category: selectedCategory.key,
        loggedAt: combinedDateTime.getTime(),
      });
    }
    close();
  };

  const getTitle = () => {
    return getModalTitle(mode, selectedLog, selectedCategory);
  };

  return {
    visible,
    mode,
    selectedLog,
    selectedCategory,
    selectedTime,
    setSelectedTime,
    openForCreate,
    openForUpdate,
    close,
    confirm,
    getTitle,
    isLoading: updateLogMutation.isPending || addLogMutation.isPending,
  };
};
