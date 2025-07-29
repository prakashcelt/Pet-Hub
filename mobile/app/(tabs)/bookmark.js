import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookmarkPage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-800">Bookmarks 🔖</Text>
          <Text className="text-gray-600">Your saved items and favorites</Text>
        </View>

        {/* Categories */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
            {[
              { title: 'All', count: 24, active: true },
              { title: 'Clinics', count: 8 },
              { title: 'Articles', count: 12 },
              { title: 'Services', count: 4 }
            ].map((category, index) => (
              <TouchableOpacity 
                key={index}
                className={`px-4 py-2 rounded-full mr-3 ${
                  category.active ? 'bg-orange-500' : 'bg-gray-100'
                }`}
              >
                <Text className={`font-semibold ${
                  category.active ? 'text-white' : 'text-gray-700'
                }`}>
                  {category.title} ({category.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bookmarked Items */}
        <View className="px-6 py-4">
          {/* Clinics Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Saved Clinics</Text>
            {[
              {
                name: 'Happy Paws Veterinary Clinic',
                address: '123 Pet Street, Downtown',
                rating: '4.8',
                distance: '0.8 km',
                type: 'clinic'
              },
              {
                name: 'PetCare Plus Animal Hospital',
                address: '456 Animal Avenue, Midtown',
                rating: '4.9',
                distance: '1.2 km',
                type: 'clinic'
              }
            ].map((clinic, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center"
              >
                <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-3">
                  <Text className="text-xl">🏥</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800">{clinic.name}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{clinic.address}</Text>
                  <View className="flex-row items-center mt-2 space-x-3">
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">⭐</Text>
                      <Text className="text-sm text-gray-700">{clinic.rating}</Text>
                    </View>
                    <Text className="text-sm text-gray-500">{clinic.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <Text className="text-orange-500 text-xl">🔖</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Articles Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Saved Articles</Text>
            {[
              {
                title: '10 Essential Tips for New Pet Parents',
                author: 'Dr. Sarah Johnson',
                readTime: '5 min read',
                category: 'Pet Care',
                type: 'article'
              },
              {
                title: 'Understanding Your Cat\'s Behavior Patterns',
                author: 'Dr. Michael Chen',
                readTime: '8 min read',
                category: 'Cat Behavior',
                type: 'article'
              },
              {
                title: 'The Complete Guide to Dog Nutrition',
                author: 'Dr. Emily Rodriguez',
                readTime: '12 min read',
                category: 'Nutrition',
                type: 'article'
              }
            ].map((article, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center"
              >
                <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center mr-3">
                  <Text className="text-xl">📖</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-sm">{article.title}</Text>
                  <Text className="text-sm text-gray-600 mt-1">By {article.author}</Text>
                  <View className="flex-row items-center mt-2 space-x-2">
                    <Text className="text-xs text-gray-500">{article.readTime}</Text>
                    <View className="w-1 h-1 bg-gray-400 rounded-full"></View>
                    <Text className="text-xs text-orange-500 font-medium">{article.category}</Text>
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <Text className="text-orange-500 text-xl">🔖</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          {/* Services Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Saved Services</Text>
            {[
              {
                title: 'Premium Pet Grooming',
                provider: 'Pawsome Grooming Studio',
                price: '$45-80',
                rating: '4.9',
                type: 'service'
              },
              {
                title: 'Professional Dog Training',
                provider: 'Happy Tails Training',
                price: '$60/session',
                rating: '4.8',
                type: 'service'
              }
            ].map((service, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-100 flex-row items-center"
              >
                <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-3">
                  <Text className="text-xl">🛠️</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-gray-800">{service.title}</Text>
                  <Text className="text-sm text-gray-600 mt-1">{service.provider}</Text>
                  <View className="flex-row items-center mt-2 space-x-3">
                    <Text className="text-sm font-semibold text-green-600">{service.price}</Text>
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">⭐</Text>
                      <Text className="text-sm text-gray-700">{service.rating}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity className="p-2">
                  <Text className="text-orange-500 text-xl">🔖</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Empty State (if no bookmarks) */}
        {/* Uncomment this section if you want to show an empty state
        <View className="flex-1 items-center justify-center px-6 py-12">
          <Text className="text-6xl mb-4">🔖</Text>
          <Text className="text-xl font-bold text-gray-800 mb-2">No Bookmarks Yet</Text>
          <Text className="text-gray-600 text-center mb-6">
            Start exploring and save your favorite clinics, articles, and services here.
          </Text>
          <TouchableOpacity className="bg-orange-500 px-6 py-3 rounded-full">
            <Text className="text-white font-semibold">Start Exploring</Text>
          </TouchableOpacity>
        </View>
        */}
      </ScrollView>
    </SafeAreaView>
  );
}
