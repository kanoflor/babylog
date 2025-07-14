import { useUserStore } from '@/stores/useUserStore';
import { Alert, Pressable, Text } from 'react-native';

export function UserInfoButton() {
  const user = useUserStore(s => s.user);
  const logout = useUserStore(s => s.logout);

  const handlePress = () => {
    Alert.alert('Log out', 'Do you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  if (!user) return null;

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingLeft: 12,
        paddingVertical: 4,
      }}
    >
      <Text style={{ fontSize: 18, color: 'white' }}>👤</Text>
    </Pressable>
  );
}
