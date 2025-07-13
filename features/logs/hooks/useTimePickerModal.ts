import type { LogEntry } from '@/stores/useLogStore';
import { useState } from 'react';
import type { CategoryInfo } from '../config/categoryConfig';
import { useAddLog } from './useAddLog';
import { useUpdateLog } from './useUpdateLog';

type TimePickerMode = 'create' | 'update';

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
      addLogMutation.mutate({
        category: selectedCategory.key,
        loggedAt: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
          selectedTime.getSeconds()
        ).getTime(),
      });
    }
    close();
  };

  const getTitle = () => {
    if (mode === 'update' && selectedLog) {
      return 'Update log time';
    } else if (mode === 'create' && selectedCategory) {
      return `${selectedCategory.emoji} ${selectedCategory.label}`;
    }
    return 'Select time';
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
