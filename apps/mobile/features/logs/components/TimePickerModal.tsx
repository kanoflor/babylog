import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  time: Date;
  onChangeTime: (date: Date) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
};

export const TimePickerModal = ({
  visible,
  time,
  onChangeTime,
  onConfirm,
  onCancel,
  title,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
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
          <Text style={{ textAlign: 'center', marginBottom: 16, fontSize: 16 }}>
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

          <TouchableOpacity
            onPress={onConfirm}
            style={{
              marginTop: 24,
              backgroundColor: '#f48ca5',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 8,
              width: '100%',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
              OK
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
