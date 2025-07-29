import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // For demo purposes, just navigate to dashboard
    // In a real app, you'd validate and create account here
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 pt-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">🐾</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800">Join Pet Hub!</Text>
            <Text className="text-base text-gray-600 mt-2 text-center">
              Create your account and start caring for your pets better
            </Text>
          </View>

          {/* Signup Form */}
          <View className="space-y-4">
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">First Name</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">Last Name</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

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
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                placeholder="Confirm your password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Terms */}
          <View className="mt-6">
            <Text className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{" "}
              <Text className="text-orange-500 font-medium">Terms of Service</Text> and{" "}
              <Text className="text-orange-500 font-medium">Privacy Policy</Text>
            </Text>
          </View>

          {/* Signup Button */}
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-xl mt-8 shadow-sm"
            onPress={handleSignup}
          >
            <Text className="text-white text-center text-lg font-semibold">Create Account</Text>
          </TouchableOpacity>

          {/* Social Signup */}
          <View className="mt-8">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-200"></View>
              <Text className="px-4 text-gray-500 text-sm">Or sign up with</Text>
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

          {/* Login Link */}
          <View className="flex-row justify-center mt-8 mb-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-orange-500 font-semibold">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
