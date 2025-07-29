import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Good Morning! 🌅</Text>
              <Text className="text-gray-600">How's your furry friend today?</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center">
              <Text className="text-xl">🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Text className="text-gray-400 mr-3">🔍</Text>
            <TextInput 
              placeholder="Search for vets, clinics, or services..."
              className="flex-1 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 py-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { title: 'Book Appointment', icon: '📅', color: 'bg-blue-100' },
              { title: 'Emergency Care', icon: '🚨', color: 'bg-red-100' },
              { title: 'Pet Records', icon: '📋', color: 'bg-green-100' },
              { title: 'Vaccination', icon: '💉', color: 'bg-purple-100' }
            ].map((action, index) => (
              <TouchableOpacity 
                key={index}
                className={`${action.color} w-[48%] p-4 rounded-xl mb-4 items-center`}
              >
                <Text className="text-3xl mb-2">{action.icon}</Text>
                <Text className="text-sm font-semibold text-gray-700 text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Pets */}
        <View className="px-6 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">Your Pets</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 font-semibold">Add Pet</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
            {[
              { name: 'Buddy', type: 'Golden Retriever', age: '3 years', emoji: '🐕' },
              { name: 'Whiskers', type: 'Persian Cat', age: '2 years', emoji: '🐱' },
              { name: 'Charlie', type: 'Beagle', age: '5 years', emoji: '🐶' }
            ].map((pet, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white rounded-xl p-4 mr-3 border border-gray-100 w-36"
              >
                <View className="items-center">
                  <Text className="text-4xl mb-2">{pet.emoji}</Text>
                  <Text className="font-bold text-gray-800 text-center">{pet.name}</Text>
                  <Text className="text-xs text-gray-600 text-center mt-1">{pet.type}</Text>
                  <Text className="text-xs text-gray-500 text-center">{pet.age}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
          <View className="bg-white rounded-xl border border-gray-100">
            {[
              { title: 'Vaccination completed', subtitle: 'Buddy - 2 days ago', icon: '✅' },
              { title: 'Vet appointment scheduled', subtitle: 'Whiskers - Tomorrow 3:00 PM', icon: '📅' },
              { title: 'Health checkup reminder', subtitle: 'Charlie - Due next week', icon: '⏰' }
            ].map((activity, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 ${index < 2 ? 'border-b border-gray-100' : ''}`}
              >
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-lg">{activity.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">{activity.title}</Text>
                  <Text className="text-sm text-gray-600">{activity.subtitle}</Text>
                </View>
                <Text className="text-gray-400">→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
