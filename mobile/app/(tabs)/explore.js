import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExplorePage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-800">Explore 🔍</Text>
          <Text className="text-gray-600">Discover amazing pet services and content</Text>
        </View>

        {/* Search */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Text className="text-gray-400 mr-3">🔍</Text>
            <TextInput 
              placeholder="Search services, articles, tips..."
              className="flex-1 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Featured Services */}
        <View className="px-6 py-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Featured Services</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
            {[
              { title: 'Pet Grooming', subtitle: 'Professional care', icon: '✂️', color: 'bg-pink-100' },
              { title: 'Dog Walking', subtitle: 'Trusted walkers', icon: '🚶‍♂️', color: 'bg-blue-100' },
              { title: 'Pet Sitting', subtitle: 'Home care', icon: '🏠', color: 'bg-green-100' },
              { title: 'Training', subtitle: 'Expert trainers', icon: '🎾', color: 'bg-purple-100' }
            ].map((service, index) => (
              <TouchableOpacity 
                key={index}
                className={`${service.color} rounded-xl p-4 mr-4 w-32 items-center`}
              >
                <Text className="text-3xl mb-2">{service.icon}</Text>
                <Text className="font-bold text-gray-800 text-center text-sm">{service.title}</Text>
                <Text className="text-xs text-gray-600 text-center mt-1">{service.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Browse Categories</Text>
          <View className="flex-row flex-wrap justify-between">
            {[
              { title: 'Pet Food & Nutrition', icon: '🍖', count: '150+ products' },
              { title: 'Toys & Accessories', icon: '🧸', count: '200+ items' },
              { title: 'Health & Wellness', icon: '💊', count: '80+ services' },
              { title: 'Training & Behavior', icon: '🎓', count: '50+ courses' },
              { title: 'Pet Insurance', icon: '🛡️', count: '15+ plans' },
              { title: 'Emergency Care', icon: '🚨', count: '24/7 available' }
            ].map((category, index) => (
              <TouchableOpacity 
                key={index}
                className="bg-white w-[48%] p-4 rounded-xl mb-4 border border-gray-100"
              >
                <Text className="text-3xl mb-2">{category.icon}</Text>
                <Text className="font-bold text-gray-800 text-sm mb-1">{category.title}</Text>
                <Text className="text-xs text-gray-600">{category.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Articles */}
        <View className="px-6 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">Popular Articles</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          
          {[
            {
              title: '10 Essential Tips for New Pet Parents',
              author: 'Dr. Sarah Johnson',
              readTime: '5 min read',
              category: 'Pet Care',
              likes: '234'
            },
            {
              title: 'Understanding Your Cat\'s Behavior Patterns',
              author: 'Dr. Michael Chen',
              readTime: '8 min read',
              category: 'Cat Behavior',
              likes: '189'
            },
            {
              title: 'The Complete Guide to Dog Nutrition',
              author: 'Dr. Emily Rodriguez',
              readTime: '12 min read',
              category: 'Nutrition',
              likes: '456'
            }
          ].map((article, index) => (
            <TouchableOpacity 
              key={index}
              className="bg-white rounded-xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 mr-3">
                  <Text className="font-bold text-gray-800 text-base mb-1">{article.title}</Text>
                  <Text className="text-sm text-gray-600 mb-2">By {article.author}</Text>
                  <View className="flex-row items-center space-x-3">
                    <Text className="text-xs text-gray-500">{article.readTime}</Text>
                    <View className="w-1 h-1 bg-gray-400 rounded-full"></View>
                    <Text className="text-xs text-orange-500 font-medium">{article.category}</Text>
                  </View>
                </View>
                <View className="items-center">
                  <Text className="text-red-500 text-lg">❤️</Text>
                  <Text className="text-xs text-gray-500 mt-1">{article.likes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Offers */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Special Offers</Text>
          <View className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-6">
            <Text className="text-white text-xl font-bold mb-2">First Vet Visit FREE! 🎉</Text>
            <Text className="text-orange-100 mb-4">
              Book your pet's first appointment with any of our partner clinics and get it completely free.
            </Text>
            <TouchableOpacity className="bg-white px-6 py-3 rounded-full self-start">
              <Text className="text-orange-500 font-bold">Claim Offer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
