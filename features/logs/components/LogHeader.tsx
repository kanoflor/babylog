import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  date: Date;
};

export const LogHeader = ({ date }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#f48ca5',
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
        {format(date, 'EEE, MMM d, yyyy')}
      </Text>
    </View>
  );
};
