import { useLogModalStore } from '@/stores/useLogModalStore';
import { useAddLog } from './useAddLog';
import { useUpdateLog } from './useUpdateLog';

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

export const useLogModal = () => {
  const modalStore = useLogModalStore();
  const addLogMutation = useAddLog();
  const updateLogMutation = useUpdateLog();

  const getTitle = () => {
    if (modalStore.mode === 'update' && modalStore.selectedLog) {
      return 'Update log time';
    } else if (modalStore.mode === 'create' && modalStore.selectedCategory) {
      return `${modalStore.selectedCategory.emoji} ${modalStore.selectedCategory.label}`;
    }
    return 'Select time';
  };

  const confirm = () => {
    if (modalStore.mode === 'update' && modalStore.selectedLog) {
      updateLogMutation.mutate({
        logId: modalStore.selectedLog.id,
        updates: {
          loggedAt: modalStore.selectedTime.getTime(),
          data: modalStore.formData,
        },
      });
    } else if (modalStore.mode === 'create' && modalStore.selectedCategory) {
      const combinedDateTime = combineDateAndTime(
        modalStore.selectedDate,
        modalStore.selectedTime
      );

      addLogMutation.mutate({
        category: modalStore.selectedCategory.key,
        loggedAt: combinedDateTime.getTime(),
        data: modalStore.formData,
      });
    }
    modalStore.close();
  };

  const isLoading = updateLogMutation.isPending || addLogMutation.isPending;

  return {
    ...modalStore,
    confirm,
    getTitle,
    isLoading,
  };
};
