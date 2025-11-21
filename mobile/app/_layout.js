import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import useAuthStore from './zustand/auth';
import "../global.css";
import { ActivityIndicator, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

export default function RootLayout() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check authentication status on app start
    checkAuth();
  }, []);
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ff7a18" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="clinicDetails" options={{ headerShown: false }} />
        <Stack.Screen name="bookingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="bookings" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
