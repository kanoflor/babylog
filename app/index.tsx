import { CategoryBar } from '@/features/logs/components/CategoryBar';
import { LogHeader } from '@/features/logs/components/LogHeader';
import { LogItem } from '@/features/logs/components/LogItem';
import { LogModal } from '@/features/logs/components/TimePickerModal';
import { useDateNavigation } from '@/features/logs/hooks/useDateNavigation';
import { useLogModal } from '@/features/logs/hooks/useLogModal';
import { useLogs } from '@/features/logs/hooks/useLogs';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerShown: false,
};

export default function TimelineScreen() {
  const { selectedDate, goToPreviousDate, goToNextDate } = useDateNavigation();
  const { data: logs, isLoading } = useLogs(selectedDate);
  const logModal = useLogModal();

  return (
    <SafeAreaView style={styles.container}>
      <LogHeader
        date={selectedDate}
        onPrev={goToPreviousDate}
        onNext={goToNextDate}
      />
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={logs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <LogItem entry={item} onPress={logModal.openForUpdate} />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📭</Text>
                <Text style={styles.emptyTitle}>No logs yet</Text>
                <Text style={styles.emptyDescription}>
                  Tap the categories below to add your first log!
                </Text>
              </View>
            }
          />
        )}
      </View>

      <View style={styles.categoryBarContainer}>
        <CategoryBar selectedDate={selectedDate} />
      </View>

      <LogModal
        visible={logModal.visible}
        time={logModal.selectedTime}
        onChangeTime={logModal.setSelectedTime}
        onConfirm={logModal.confirm}
        onCancel={logModal.close}
        title={logModal.getTitle()}
        isLoading={logModal.isLoading}
        category={logModal.getCurrentCategory()}
        formData={logModal.formData}
        onUpdateFormData={logModal.updateFormData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2cb94',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    paddingVertical: 64,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
  categoryBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
