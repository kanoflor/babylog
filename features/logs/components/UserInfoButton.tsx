import { useUserStore } from '@/stores/useUserStore';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';

export function UserInfoButton() {
  const user = useUserStore(s => s.user);
  const logout = useUserStore(s => s.logout);

  const handlePress = () => {
    Alert.alert('Log out', 'Do you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/login');
        },
      },
    ]);
  };

  if (!user) return null;

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Text style={styles.text}>👤</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 12,
    paddingVertical: 4,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
