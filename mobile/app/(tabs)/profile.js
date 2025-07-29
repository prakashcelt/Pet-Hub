import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function ProfilePage() {
  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-100">
          <View className="items-center">
            <View className="w-24 h-24 bg-orange-500 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl text-white">👤</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
            <Text className="text-gray-600">Pet Parent since 2021</Text>
            <TouchableOpacity className="mt-3 bg-orange-100 px-4 py-2 rounded-full">
              <Text className="text-orange-600 font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="bg-white mx-6 mt-4 rounded-xl border border-gray-100">
          <View className="flex-row">
            <View className="flex-1 items-center py-4 border-r border-gray-100">
              <Text className="text-2xl font-bold text-orange-500">3</Text>
              <Text className="text-sm text-gray-600">Pets</Text>
            </View>
            <View className="flex-1 items-center py-4 border-r border-gray-100">
              <Text className="text-2xl font-bold text-blue-500">12</Text>
              <Text className="text-sm text-gray-600">Appointments</Text>
            </View>
            <View className="flex-1 items-center py-4">
              <Text className="text-2xl font-bold text-green-500">8</Text>
              <Text className="text-sm text-gray-600">Reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 py-6">
          {/* Account Section */}
          <View className="bg-white rounded-xl border border-gray-100 mb-4">
            <Text className="text-lg font-bold text-gray-800 px-4 py-3 border-b border-gray-100">
              Account
            </Text>
            {[
              { title: 'Personal Information', icon: '👤', color: 'text-blue-500' },
              { title: 'My Pets', icon: '🐾', color: 'text-orange-500' },
              { title: 'Appointment History', icon: '📅', color: 'text-green-500' },
              { title: 'Payment Methods', icon: '💳', color: 'text-purple-500' }
            ].map((item, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${index < 3 ? 'border-b border-gray-100' : ''}`}
              >
                <Text className={`text-xl mr-3 ${item.color}`}>{item.icon}</Text>
                <Text className="flex-1 font-medium text-gray-800">{item.title}</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Preferences Section */}
          <View className="bg-white rounded-xl border border-gray-100 mb-4">
            <Text className="text-lg font-bold text-gray-800 px-4 py-3 border-b border-gray-100">
              Preferences
            </Text>
            {[
              { title: 'Notifications', icon: '🔔', color: 'text-yellow-500' },
              { title: 'Privacy Settings', icon: '🔒', color: 'text-red-500' },
              { title: 'Language', icon: '🌐', color: 'text-blue-500' },
              { title: 'Theme', icon: '🎨', color: 'text-pink-500' }
            ].map((item, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${index < 3 ? 'border-b border-gray-100' : ''}`}
              >
                <Text className={`text-xl mr-3 ${item.color}`}>{item.icon}</Text>
                <Text className="flex-1 font-medium text-gray-800">{item.title}</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Support Section */}
          <View className="bg-white rounded-xl border border-gray-100 mb-4">
            <Text className="text-lg font-bold text-gray-800 px-4 py-3 border-b border-gray-100">
              Support
            </Text>
            {[
              { title: 'Help Center', icon: '❓', color: 'text-blue-500' },
              { title: 'Contact Support', icon: '💬', color: 'text-green-500' },
              { title: 'Report a Problem', icon: '⚠️', color: 'text-orange-500' },
              { title: 'Rate the App', icon: '⭐', color: 'text-yellow-500' }
            ].map((item, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${index < 3 ? 'border-b border-gray-100' : ''}`}
              >
                <Text className={`text-xl mr-3 ${item.color}`}>{item.icon}</Text>
                <Text className="flex-1 font-medium text-gray-800">{item.title}</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Emergency Contact */}
          <TouchableOpacity className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🚨</Text>
              <View className="flex-1">
                <Text className="font-bold text-red-700">Emergency Vet Contact</Text>
                <Text className="text-sm text-red-600">24/7 Emergency Hotline</Text>
              </View>
              <View className="bg-red-500 px-4 py-2 rounded-lg">
                <Text className="text-white font-semibold">Call Now</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* App Info */}
          <View className="bg-white rounded-xl border border-gray-100 mb-4">
            {[
              { title: 'Terms of Service', icon: '📄' },
              { title: 'Privacy Policy', icon: '🔐' },
              { title: 'About Pet Hub', icon: 'ℹ️' }
            ].map((item, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${index < 2 ? 'border-b border-gray-100' : ''}`}
              >
                <Text className="text-xl mr-3 text-gray-500">{item.icon}</Text>
                <Text className="flex-1 font-medium text-gray-800">{item.title}</Text>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            className="bg-red-500 rounded-xl p-4 items-center"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold text-lg">Logout</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text className="text-center text-gray-500 text-sm mt-6 mb-4">
            Pet Hub v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
