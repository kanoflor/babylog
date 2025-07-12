import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { LogEntry } from '../../../stores/useLogStore';
import { categories } from '../config/categoryConfig';

type Props = {
  entry: LogEntry;
};

export const LogItem = ({ entry }: Props) => {
  const category = categories.find(c => c.key === entry.category);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
      }}
    >
      {/* Time（HH:mm） */}
      <Text style={{ fontSize: 16, width: 60 }}>
        {format(entry.loggedAt, 'HH:mm')}
      </Text>

      {/* Emoji */}
      <Text style={{ fontSize: 20, marginRight: 8 }}>
        {category?.emoji ?? '❓'}
      </Text>

      {/* Category Name */}
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        {category?.label ?? entry.category}
      </Text>
    </View>
  );
};
