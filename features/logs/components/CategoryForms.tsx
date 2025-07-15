import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { CategoryKey } from '../config/categoryConfig';
import type { LogData } from '../types';

type CategoryFormsProps = {
  category: CategoryKey;
  formData: LogData;
  onUpdateFormData: (data: Partial<LogData>) => void;
};

export const CategoryForms = ({
  category,
  formData,
  onUpdateFormData,
}: CategoryFormsProps) => {
  const handleChengeText = (text: string) => {
    const amount = parseInt(text) || 0;
    onUpdateFormData({
      formula: { amount },
    });
  };
  const renderFormulaForm = () => {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.label}>Amount (ml)</Text>
        <TextInput
          value={formData.formula?.amount?.toString() || ''}
          onChangeText={handleChengeText}
          keyboardType="numeric"
          placeholder="Enter amount"
          style={styles.textInput}
        />
      </View>
    );
  };

  switch (category) {
    case 'formula':
      return renderFormulaForm();
    // TODO: Add other category forms here if needed
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
