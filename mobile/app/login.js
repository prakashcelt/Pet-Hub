import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";
import useAuthStore from "./zustand/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { signin, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    clearError();
    const result = await signin(email, password);
    
    if (result.success) {
      // Navigate to dashboard on successful login
      router.replace("/(tabs)");
    } else {
      // Show error message
      Alert.alert("Login Failed", result.error || "Something went wrong");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="flex-1 px-6 pt-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">🐾</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800">Welcome Back!</Text>
            <Text className="text-base text-gray-600 mt-2">Login to your Pet Hub account</Text>
          </View>

          {/* Login Form */}
          <View className="space-y-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity>
              <Text className="text-orange-500 text-sm font-medium text-right">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            className={`py-4 rounded-xl mt-8 shadow-sm ${isLoading ? 'bg-orange-300' : 'bg-orange-500'}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {isLoading ? "Signing In..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && (
            <View className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          {/* Social Login */}
          <View className="mt-8">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-200"></View>
              <Text className="px-4 text-gray-500 text-sm">Or continue with</Text>
              <View className="flex-1 h-px bg-gray-200"></View>
            </View>

            <View className="flex-row space-x-4">
              <TouchableOpacity className="flex-1 bg-blue-50 border border-blue-200 py-3 rounded-xl">
                <Text className="text-blue-600 text-center font-medium">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-gray-50 border border-gray-200 py-3 rounded-xl">
                <Text className="text-gray-700 text-center font-medium">Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8 mb-8">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text className="text-orange-500 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
