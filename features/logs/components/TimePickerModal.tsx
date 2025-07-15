import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
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
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.modalContent}>
          <Text style={styles.title}>{title ?? 'Select time'}</Text>

          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                if (date) onChangeTime(date);
              }}
              style={styles.datePicker}
            />
          </View>

          {category && onUpdateFormData && (
            <View style={styles.formContainer}>
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
            style={[
              styles.confirmButton,
              isLoading && styles.confirmButtonDisabled,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator
                color="white"
                size="small"
                style={styles.loadingIndicator}
              />
            ) : null}
            <Text style={styles.confirmText}>
              {isLoading ? 'Saving...' : 'OK'}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  datePicker: {
    width: 320,
  },
  formContainer: {
    width: '100%',
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#f48ca5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loadingIndicator: {
    marginRight: 8,
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
