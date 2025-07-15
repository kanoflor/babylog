import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../config/categoryConfig';
import { useLogModal } from '../hooks/useLogModal';

export const CategoryBar = ({ selectedDate }: { selectedDate: Date }) => {
  const logModal = useLogModal();

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
            onPress={() => logModal.openForCreate(category, selectedDate)}
            style={{ alignItems: 'center', marginHorizontal: 12 }}
          >
            <Text style={{ fontSize: 24 }}>{category.emoji}</Text>
            <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 4 }}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
