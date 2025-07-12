import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { CategoryBar } from '../features/logs/components/CategoryBar';
import { LogHeader } from '../features/logs/components/LogHeader';
import { LogItem } from '../features/logs/components/LogItem';
import { useSortedLogs } from '../features/logs/hooks/useSortedLogs';

export default function TimelineScreen() {
  const logs = useSortedLogs();

  const today = new Date();

  return (
    <View style={{ flex: 1 }}>
      <LogHeader date={today} />

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