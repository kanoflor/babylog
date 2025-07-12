import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { CategoryBar } from '../features/logs/components/CategoryBar';
import { LogHeader } from '../features/logs/components/LogHeader';
import { LogItem } from '../features/logs/components/LogItem';
import { useDateNavigation } from '../features/logs/hooks/useDateNavigation';
import { useLogsByDate } from '../features/logs/hooks/useLogsByDate';

export const options = {
  headerShown: false,
};

export default function TimelineScreen() {
  const {
    selectedDate,
    goToPreviousDate,
    goToNextDate,
  } = useDateNavigation();

  const logs = useLogsByDate(selectedDate);

  const today = new Date();

  return (
    <View style={{ flex: 1 }}>
      <LogHeader
      date={selectedDate}
      onPrev={goToPreviousDate}
      onNext={goToNextDate}
    />

      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LogItem entry={item} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Empty Log</Text>}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <CategoryBar />
      </View>
    </View>
  );
}