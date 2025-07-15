import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { CategoryKey } from '../config/categoryConfig';
import type { LogData } from '../types';
import { CategoryForms } from './CategoryForms';

type Props = {
  visible: boolean;
  time: Date;
  onChangeTime: (date: Date) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  isLoading?: boolean;
  category?: CategoryKey;
  formData?: LogData;
  onUpdateFormData?: (data: Partial<LogData>) => void;
};

export const LogModal = ({
  visible,
  time,
  onChangeTime,
  onConfirm,
  onCancel,
  title,
  isLoading = false,
  category,
  formData = {},
  onUpdateFormData,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <Pressable
        style={{ flex: 1, justifyContent: 'flex-end' }}
        onPress={onCancel}
      >
        <Pressable
          style={{
            backgroundColor: '#fff',
            paddingTop: 24,
            paddingBottom: 32,
            paddingHorizontal: 24,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 16,
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            {title ?? 'Select time'}
          </Text>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                if (date) onChangeTime(date);
              }}
              style={{ width: 320 }}
            />
          </View>

          {category && onUpdateFormData && (
            <View style={{ width: '100%' }}>
              <CategoryForms
                category={category}
                formData={formData}
                onUpdateFormData={onUpdateFormData}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={onConfirm}
            disabled={isLoading}
            style={{
              marginTop: 24,
              backgroundColor: isLoading ? '#ccc' : '#f48ca5',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 8,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                color="white"
                size="small"
                style={{ marginRight: 8 }}
              />
            ) : null}
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              {isLoading ? 'Saving...' : 'OK'}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
