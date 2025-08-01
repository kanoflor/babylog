import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserInfoButton } from './UserInfoButton';

type Props = {
  date: Date;
  onPrev: () => void;
  onNext: () => void;
};

export const LogHeader = ({ date, onPrev, onNext }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev}>
        <Text style={styles.nav}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{format(date, 'EEE, MMM d, yyyy')}</Text>

      <TouchableOpacity onPress={onNext}>
        <Text style={styles.nav}>{'>'}</Text>
      </TouchableOpacity>

      <UserInfoButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2cb94',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  nav: {
    color: '#4a3227',
    fontSize: 24,
    fontWeight: '500',
  },
  title: {
    color: '#4a3227',
    fontSize: 16,
    fontWeight: '500',
  },
});
