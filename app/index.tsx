import { useAuthListener } from '@/features/auth/hooks/useAuthListener';
import { CategoryBar } from '@/features/logs/components/CategoryBar';
import { LogHeader } from '@/features/logs/components/LogHeader';
import { LogItem } from '@/features/logs/components/LogItem';
import { useDateNavigation } from '@/features/logs/hooks/useDateNavigation';
import { useLogsByDate } from '@/features/logs/hooks/useLogsByDate';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const options = {
  headerShown: false,
};

export default function TimelineScreen() {
  const { user, loading } = useAuthListener();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  const { selectedDate, goToPreviousDate, goToNextDate } = useDateNavigation();

  const logs = useLogsByDate(selectedDate);

  // TODO: TimelineScreenは別ファイルにし、index.tsxではログインチェックのみ行う
  if (loading) return <Text>Loading...</Text>;

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
          renderItem={({ item }) => <LogItem entry={item} />}
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
        <CategoryBar />
      </View>
    </SafeAreaView>
  );
}
