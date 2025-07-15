import React from 'react';
import { Text, TextInput, View } from 'react-native';
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
  const renderFormulaForm = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 8,
            color: '#333',
          }}
        >
          Amount (ml)
        </Text>
        <TextInput
          value={formData.formula?.amount?.toString() || ''}
          onChangeText={text => {
            const amount = parseInt(text) || 0;
            onUpdateFormData({
              formula: { amount },
            });
          }}
          keyboardType="numeric"
          placeholder="Enter amount"
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: '#fff',
          }}
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
