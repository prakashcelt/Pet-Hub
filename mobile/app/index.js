import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function WelcomePage() {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-orange-50 to-orange-100">
      <View className="flex-1 justify-between px-8 py-6">

        {/* Logo & App Name */}
        <View className="items-center mt-12">
          <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-3xl">🐾</Text>
          </View>
          <Text className="text-4xl font-bold text-orange-800 text-center">Pet Hub</Text>
          <Text className="text-lg text-orange-600 text-center mt-2">Your pet's best companion app</Text>
        </View>

        {/* Pet Image */}
        <View className="items-center mt-8 mb-8">
          <Image
            source={require('../pic1.png')}
            className="w-80 h-64 rounded-3xl"
            resizeMode="cover"
          />
        </View>

        {/* Buttons */}
        <View className="w-full max-w-sm mx-auto space-y-4">
          <Link href="/login" asChild>
            <TouchableOpacity className="bg-orange-500 py-4 px-8 rounded-full shadow-lg active:bg-orange-600">
              <Text className="text-white text-center text-lg font-bold">Login</Text>
            </TouchableOpacity>
          </Link>

          {/* Signup Link */}
          <View className="pt-2">
            <Text className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup">
                <Text className="text-orange-600 font-semibold">Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-10">
          <Text className="text-sm text-gray-500 text-center">
            Trusted by thousands of pet parents
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}