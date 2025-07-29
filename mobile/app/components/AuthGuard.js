import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import useAuthStore from '../zustand/auth';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthGuard({ children }) {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      const isValid = await checkAuth();
      if (!isValid) {
        // Redirect to login if no valid token
        router.replace('/login');
      }
      setIsLoading(false);
    };

    validateAuth();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-orange-100 justify-center items-center">
        <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">🐾</Text>
        </View>
        <Text className="text-lg text-orange-800 font-semibold">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return children;
}
