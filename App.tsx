import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function App() {
  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
