import { ErrorMessage } from '@/features/auth/components/ErrorMessage';
import { useAuthError } from '@/features/auth/hooks/useAuthError';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSignUp } from '../features/auth/hooks/useSignUp';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { error, handleError, clearError } = useAuthError();
  const { mutate: signup, isPending } = useSignUp();

  const handleSubmit = () => {
    clearError();

    signup(
      { email, password: pw },
      {
        onSuccess: () => router.push('/'),
        onError: error => handleError(error),
      }
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <View style={styles.container}>
        <Image
          source={require('../assets/babylog-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <ErrorMessage error={error} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="example@mail.com"
            placeholderTextColor="#8c7450"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            placeholderTextColor="#8c7450"
            autoCapitalize="none"
            onChangeText={setPw}
          />

          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Button title="Sign Up" onPress={handleSubmit} />
          )}

          <Pressable onPress={() => router.push('/login')}>
            <Text style={styles.link}>
              Already have an account?{' '}
              <Text style={styles.linkBold}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8e1c1',
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  form: {
    width: '100%',
    maxWidth: 320,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d8b78a',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#3a2a18',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#5a4321',
    fontSize: 14,
  },
  linkBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
