import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../config/categoryConfig';
import { useTimePickerModal } from '../hooks/useTimePickerModal';
import { TimePickerModal } from './TimePickerModal';

export const CategoryBar = ({ selectedDate }: { selectedDate: Date }) => {
  const timePickerModal = useTimePickerModal();

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#f7e2c1' }}>
      <ScrollView
        horizontal
        style={{
          padding: 8,
          backgroundColor: '#f7e2c1',
          borderTopWidth: 1,
          borderColor: '#ccc',
        }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            onPress={() =>
              timePickerModal.openForCreate(category, selectedDate)
            }
            style={{ alignItems: 'center', marginHorizontal: 12 }}
          >
            <Text style={{ fontSize: 24 }}>{category.emoji}</Text>
            <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 4 }}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TimePickerModal
        visible={timePickerModal.visible}
        time={timePickerModal.selectedTime}
        onChangeTime={timePickerModal.setSelectedTime}
        onConfirm={timePickerModal.confirm}
        onCancel={timePickerModal.close}
        title={timePickerModal.getTitle()}
        isLoading={timePickerModal.isLoading}
      />
    </SafeAreaView>
  );
};
