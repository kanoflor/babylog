import { useUserStore } from '@/stores/useUserStore';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useUserStore(s => s.login);

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      login(email, password);
      router.replace('/');
    } catch (error) {
      console.error(error);
      // TODO: show error message to users
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <View style={styles.container}>
        <Image
          source={require('../assets/babylog-icon.png')}
          style={styles.logo}
        />
        <View style={styles.form}>
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
            autoCapitalize="none"
            placeholder="password"
            placeholderTextColor="#8c7450"
            onChangeText={setPassword}
          />

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button title="Sign In" onPress={handleSubmit} />
          )}

          <Pressable onPress={() => router.push('/signup')}>
            <Text style={styles.link}>
              Don’t have an account?{' '}
              <Text style={styles.linkBold}>Sign up</Text>
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
