import { CategoryBar } from '@/features/logs/components/CategoryBar';
import { LogHeader } from '@/features/logs/components/LogHeader';
import { LogItem } from '@/features/logs/components/LogItem';
import { TimePickerModal } from '@/features/logs/components/TimePickerModal';
import { useDateNavigation } from '@/features/logs/hooks/useDateNavigation';
import { useLogs } from '@/features/logs/hooks/useLogs';
import { useTimePickerModal } from '@/features/logs/hooks/useTimePickerModal';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerShown: false,
};

export default function TimelineScreen() {
  const { selectedDate, goToPreviousDate, goToNextDate } = useDateNavigation();
  const { data: logs } = useLogs(selectedDate);
  const timePickerModal = useTimePickerModal();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f48ca5' }}>
      <LogHeader
        date={selectedDate}
        onPrev={goToPreviousDate}
        onNext={goToNextDate}
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={logs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <LogItem entry={item} onPress={timePickerModal.openForUpdate} />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center' }}>Empty Log</Text>
          }
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <CategoryBar selectedDate={selectedDate} />
      </View>

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
}
