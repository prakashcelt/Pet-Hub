import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import useAuthStore from './zustand/auth';
import "../global.css";

export default function RootLayout() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status on app start
    checkAuth();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="clinicDetails" options={{ headerShown: false }} />
        <Stack.Screen name="bookingScreen" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
