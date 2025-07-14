import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ErrorMessageProps = {
  error: string | null;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fee',
    borderColor: '#fcc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  text: {
    color: '#c44',
    fontSize: 14,
    textAlign: 'center',
  },
});
