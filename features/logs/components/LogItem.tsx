import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '../config/categoryConfig';
import { LogEntry } from '../types';
import { getAdditionalData } from '../utils/getAdditionalData';

type Props = {
  entry: LogEntry;
  onPress?: (entry: LogEntry) => void;
};

export const LogItem = ({ entry, onPress }: Props) => {
  const category = categories.find(c => c.key === entry.category);
  const additionalData = getAdditionalData(entry);

  return (
    <TouchableOpacity onPress={() => onPress?.(entry)} style={styles.container}>
      {/* Left:Time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {format(new Date(entry.loggedAt), 'HH:mm')}
        </Text>
      </View>

      {/* Right: Emoji + Label + Additional Data */}
      <View style={styles.contentContainer}>
        <Text style={styles.emoji}>{category?.emoji ?? '❓'}</Text>
        <Text style={styles.label}>{category?.label ?? entry.category}</Text>
        {additionalData && (
          <Text style={styles.additionalData}>{additionalData}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
  },
  timeContainer: {
    width: 64,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  additionalData: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '400',
  },
});
