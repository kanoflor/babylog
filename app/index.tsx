import { CategoryBar } from '@/features/logs/components/CategoryBar';
import { LogHeader } from '@/features/logs/components/LogHeader';
import { LogItem } from '@/features/logs/components/LogItem';
import { TimePickerModal } from '@/features/logs/components/TimePickerModal';
import { useDateNavigation } from '@/features/logs/hooks/useDateNavigation';
import { useLogs } from '@/features/logs/hooks/useLogs';
import { useTimePickerModal } from '@/features/logs/hooks/useTimePickerModal';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerShown: false,
};

export default function TimelineScreen() {
  const { selectedDate, goToPreviousDate, goToNextDate } = useDateNavigation();
  const { data: logs, isLoading } = useLogs(selectedDate);
  const timePickerModal = useTimePickerModal();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f48ca5' }}>
      <LogHeader
        date={selectedDate}
        onPrev={goToPreviousDate}
        onNext={goToNextDate}
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading ? (
          <View style={{ flex: 1, paddingVertical: 64 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <LogItem entry={item} onPress={timePickerModal.openForUpdate} />
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 32,
                  paddingVertical: 64,
                }}
              >
                <Text style={{ fontSize: 48, marginBottom: 16 }}>📭</Text>
                <Text
                  style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}
                >
                  No logs yet
                </Text>
                <Text
                  style={{ fontSize: 14, textAlign: 'center', color: '#888' }}
                >
                  Tap the categories below to add your first log!
                </Text>
              </View>
            }
          />
        )}
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
