import { format } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { categories } from '../config/categoryConfig';
import { LogEntry } from '../types';

type Props = {
  entry: LogEntry;
  onPress?: (entry: LogEntry) => void;
};

export const LogItem = ({ entry, onPress }: Props) => {
  const category = categories.find(c => c.key === entry.category);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(entry)}
      style={{
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: 'white',
      }}
    >
      {/* Left:Time */}
      <View style={{ width: 64 }}>
        <Text style={{ fontSize: 16, color: '#333' }}>
          {format(new Date(entry.loggedAt), 'HH:mm')}
        </Text>
      </View>

      {/* Right: Emoji + Label */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginRight: 8 }}>
          {category?.emoji ?? '❓'}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>
          {category?.label ?? entry.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
