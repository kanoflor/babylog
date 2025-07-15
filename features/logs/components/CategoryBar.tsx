import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '../config/categoryConfig';
import { useLogModal } from '../hooks/useLogModal';

export const CategoryBar = ({ selectedDate }: { selectedDate: Date }) => {
  const logModal = useLogModal();

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.key}
            onPress={() => logModal.openForCreate(category, selectedDate)}
            style={styles.categoryButton}
          >
            <Text style={styles.emoji}>{category.emoji}</Text>
            <Text style={styles.label}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7e2c1',
  },
  scrollView: {
    padding: 8,
    backgroundColor: '#f7e2c1',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
