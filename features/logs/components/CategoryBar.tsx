import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogStore } from '../../../stores/useLogStore';
import { categories } from '../config/categoryConfig';
import { useTimePickerModal } from '../hooks/useTimePickerModal';
import { TimePickerModal } from './TimePickerModal';

export const CategoryBar = () => {
  const addLog = useLogStore((s) => s.addLog);

  const {
    visible,
    selectedCategory,
    selectedTime,
    setSelectedTime,
    open,
    close,
  } = useTimePickerModal();

  const handleConfirm = () => {
    if (selectedCategory) {
      addLog({
        category: selectedCategory,
        loggedAt: selectedTime.getTime(),
        author: 'parent', // TODO: ユーザー名を取得する
      });
    }
    close();
  };

  const selectedCategoryInfo = categories.find((c) => c.key === selectedCategory);
  const title = selectedCategoryInfo
    ? `${selectedCategoryInfo.emoji} ${selectedCategoryInfo.label}`
    : '';

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fcd2e2' }}>
      <ScrollView
        horizontal
        style={{
          padding: 8,
          backgroundColor: '#f9d3db',
          borderTopWidth: 1,
          borderColor: '#ccc',
        }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.key} onPress={() => open(category.key)} style={{ alignItems: 'center', marginHorizontal: 12 }}>
            <Text style={{ fontSize: 24 }}>{category.emoji}</Text>
            <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 4 }}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TimePickerModal
        visible={visible}
        time={selectedTime}
        onChangeTime={setSelectedTime}
        onConfirm={handleConfirm}
        onCancel={close}
        title={title}
      />
    </SafeAreaView>
  );
};
