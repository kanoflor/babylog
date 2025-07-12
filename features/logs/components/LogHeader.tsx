import { format } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
};

export const LogHeader = ({ date, onPrev, onNext }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#f48ca5',
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity onPress={onPrev}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          {'<'}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
        {format(date, 'EEE, MMM d, yyyy')}
      </Text>

      <TouchableOpacity onPress={onNext}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
