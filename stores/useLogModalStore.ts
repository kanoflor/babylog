import type { CategoryInfo } from '@/features/logs/config/categoryConfig';
import type { LogData, LogEntry } from '@/features/logs/types';
import { create } from 'zustand';

export type ModalMode = 'create' | 'update';

type LogModalState = {
  visible: boolean;
  mode: ModalMode;
  selectedLog: LogEntry | null;
  selectedCategory: CategoryInfo | null;
  selectedDate: Date;
  selectedTime: Date;
  formData: LogData;
  openForCreate: (category: CategoryInfo, date: Date) => void;
  openForUpdate: (log: LogEntry) => void;
  close: () => void;
  setSelectedTime: (time: Date) => void;
  updateFormData: (data: Partial<LogData>) => void;
  resetFormData: () => void;
};

export const useLogModalStore = create<LogModalState>((set, get) => ({
  visible: false,
  mode: 'create',
  selectedLog: null,
  selectedCategory: null,
  selectedDate: new Date(),
  selectedTime: new Date(),
  formData: {},

  openForCreate: (category, date) => {
    set({
      visible: true,
      mode: 'create',
      selectedCategory: category,
      selectedDate: date,
      selectedTime: new Date(),
      selectedLog: null,
      formData: {},
    });
  },

  openForUpdate: log => {
    set({
      visible: true,
      mode: 'update',
      selectedLog: log,
      selectedTime: new Date(log.loggedAt),
      selectedCategory: null,
      formData: log.data || {},
    });
  },

  close: () => {
    set({
      visible: false,
      selectedLog: null,
      selectedCategory: null,
      formData: {},
    });
  },

  setSelectedTime: time => {
    set({ selectedTime: time });
  },

  updateFormData: data => {
    const currentFormData = get().formData;
    set({
      formData: { ...currentFormData, ...data },
    });
  },

  resetFormData: () => {
    set({ formData: {} });
  },
}));
