import { Text, View, TouchableOpacity, ScrollView, TextInput, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useClinicsStore from "../zustand/clinics";
import { useCallback, useEffect, useState } from "react";
import { router } from "expo-router";

export default function ClinicsPage() {
  const { clinics, isLoading, error, fetchClinics } = useClinicsStore();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch clinics when component mounts
  useEffect(() => {
    console.log("CELT: useEffect called, calling fetchClinics");
    fetchClinics();
  }, []);

  // Pull to refresh functionality
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchClinics();
    setRefreshing(false);
  }, []);

  // Navigate to clinic details
  const handleClinicPress = (clinic) => {
    router.push({
      pathname: '/clinicDetails',
      params: {
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        description: clinic.description
      }
    });
  };

  // Add loading state display
  if (isLoading && clinics.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-lg text-orange-800 font-semibold">Loading clinics...</Text>
      </SafeAreaView>
    );
  }

  // Add error state display
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center px-6">
        <Text className="text-lg text-red-800 font-semibold mb-2">Error loading clinics</Text>
        <Text className="text-red-600 text-center mb-4">{error}</Text>
        <TouchableOpacity 
          onPress={fetchClinics}
          className="bg-orange-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-800">Nearby Clinics 🏥</Text>
          <Text className="text-gray-600">Find the best care for your pets</Text>
        </View>

        {/* Search and Filter */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row items-center space-x-3">
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
              <Text className="text-gray-400 mr-3">🔍</Text>
              <TextInput 
                placeholder="Search clinics..."
                className="flex-1 text-base text-gray-700"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity className="bg-orange-500 px-4 py-3 rounded-xl">
              <Text className="text-white font-semibold">Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
            {[
              { title: 'All', active: true },
              { title: 'Emergency' },
              { title: 'General Care' },
              { title: 'Specialists' },
              { title: '24/7 Open' }
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
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Clinics List */}
        <View className="px-6 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">
              {clinics.length} clinics found
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-orange-500 font-semibold mr-1">Map View</Text>
              <Text className="text-orange-500">🗺️</Text>
            </TouchableOpacity>
          </View>

          {/* Show API data */}
          {clinics.map((clinic, index) => (
            <TouchableOpacity 
              key={clinic.id || index}
              className="bg-white rounded-xl p-4 mb-4 border border-gray-100 shadow-sm"
              onPress={() => handleClinicPress(clinic)}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-3">
                  <Text className="text-lg font-bold text-gray-800 mb-1">
                    {clinic.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    📍 {clinic.address}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-3">
                    {clinic.description}
                  </Text>
                  <View className="flex-row items-center space-x-3">
                    <View className="flex-row items-center">
                      <Text className="text-yellow-500 mr-1">⭐</Text>
                      <Text className="text-sm font-semibold text-gray-700">4.8</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-blue-500 mr-1">🏥</Text>
                      <Text className="text-sm text-gray-600">ID: {clinic.id}</Text>
                    </View>
                  </View>
                </View>
                <View className="px-3 py-1 rounded-full bg-green-100">
                  <Text className="text-xs font-semibold text-green-700">Open</Text>
                </View>
              </View>

              <View className="flex-row flex-wrap mb-3">
                {['General Care', 'Emergency', 'Surgery'].map((service, serviceIndex) => (
                  <View key={serviceIndex} className="bg-orange-100 px-2 py-1 rounded mr-2 mb-1">
                    <Text className="text-xs text-orange-700 font-medium">{service}</Text>
                  </View>
                ))}
              </View>

              <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                <Text className="text-sm text-gray-600">
                  ⏰ Available today
                </Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="bg-orange-100 px-3 py-2 rounded-lg">
                    <Text className="text-orange-600 text-sm font-semibold">Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-orange-500 px-3 py-2 rounded-lg">
                    <Text className="text-white text-sm font-semibold">Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* No clinics found */}
          {clinics.length === 0 && !isLoading && (
            <View className="items-center py-8">
              <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">🏥</Text>
              </View>
              <Text className="text-gray-500 text-center mb-2">No clinics found</Text>
              <Text className="text-gray-400 text-center text-sm mb-4">
                Pull down to refresh or try again
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}