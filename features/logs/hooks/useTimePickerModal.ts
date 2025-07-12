import { useState } from 'react';

export const useTimePickerModal = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const open = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSelectedTime(new Date());
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setSelectedCategory(null);
  };

  return {
    visible,
    selectedCategory,
    selectedTime,
    setSelectedTime,
    open,
    close,
  };
};
