import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { use, useEffect } from "react";
import useClinicsStore from "../zustand/clinics";

export default function ClinicDetailsView({ 
  // clinicId, 
  // clinicAddress, 
  clinicDescription,
  clinicName, 
  clinicDetails, 
  isLoading, 
  error,  
  onCall 
}) {


const onBookAppointment = async () => { 
  // Make sure clinicDetails and facilities exist before navigation
  if (clinicDetails && Array.isArray(clinicDetails.facilities)) {
    // Serialize each facility object as individual props
    const facilitiesForNavigation = clinicDetails.facilities.map(facility => ({
      id: facility.id,
      name: facility.name,
      description: facility.description,
      clinic_id: facility.clinic_id
    }));
    
    router.push({
      pathname: '/bookingScreen',
      params: { 
        facilityName: clinicName, 
        facilitiesJson: JSON.stringify(facilitiesForNavigation)
      }
    });
  } else {
    console.log("Error: No facilities available");
    Alert.alert("Error", "No facilities available for booking");
  }
};

  useEffect(() => {
    console.log("CELT facilities: *", clinicDetails)
  }, [clinicDetails]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <View className="w-20 h-20 bg-orange-500 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">🏥</Text>
        </View>
        <Text className="text-lg text-orange-800 font-semibold">Loading clinic details...</Text>
      </SafeAreaView>
    );
  }

  // Error state (but still show fallback data)
  if (error && !clinicDetails) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center px-6">
        <View className="w-20 h-20 bg-red-500 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">❌</Text>
        </View>
        <Text className="text-lg text-red-800 font-semibold mb-2">Error loading clinic details</Text>
        <Text className="text-red-600 text-center mb-4">{error}</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-orange-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row items-center mb-2">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4 p-2 rounded-lg bg-gray-100"
            >
              <Text className="text-lg">←</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800 flex-1">Clinic Details</Text>
            {error && (
              <View className="bg-yellow-100 px-2 py-1 rounded">
                <Text className="text-yellow-700 text-xs">Offline Mode</Text>
              </View>
            )}
          </View>
        </View>

        {/* Clinic Image Placeholder */}
        <View className="bg-white">
          <View className="h-48 bg-orange-100 items-center justify-center">
            <Text className="text-6xl">🏥</Text>
            <Text className="text-orange-600 font-semibold mt-2">Clinic Photo</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="bg-white mt-2 px-6 py-6">
          {/* Clinic Name and Status */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                {clinicName || 'Unknown Clinic'}
              </Text>
              <View className="flex-row items-center mb-2">
                <Text className="text-yellow-500 mr-1">⭐</Text>
                <Text className="text-lg font-semibold text-gray-700 mr-3">
                  {clinicDetails?.rating || '4.8'}
                </Text>
                <Text className="text-gray-500">
                  ({clinicDetails?.review_count || '124'} reviews)
                </Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-blue-500 mr-1">🏥</Text>
                <Text className="text-sm text-gray-600">
                  {clinicDetails?.count || 0} facilities available
                </Text>
              </View>
            </View>
            <View className="px-3 py-1 rounded-full bg-green-100">
              <Text className="text-sm font-semibold text-green-700">
                {clinicDetails?.status || 'Open Now'}
              </Text>
            </View>
          </View>

          {/* Quick Info */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-3">
              <Text className="text-lg mr-2">📍</Text>
              <Text className="text-gray-700 flex-1">{clinicDetails?.address}</Text>
            </View>
            <View className="flex-row items-center mb-3">
              <Text className="text-lg mr-2">🕒</Text>
              <Text className="text-gray-700">
                {clinicDetails?.working_hours || 'Open: 8:00 AM - 8:00 PM'}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-lg mr-2">📞</Text>
              <Text className="text-gray-700">
                {clinicDetails?.phone || '+1 (555) 123-4567'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">About</Text>
            <Text className="text-gray-600 leading-6">
              {clinicDescription || 'No description available.'}
            </Text>
          </View>

          {/* Services/Facilities */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">
              Available Facilities ({clinicDetails?.count || 0})
            </Text>
            <View className="space-y-3 mb-4">
              {clinicDetails?.facilities?.map((facility, index) => (
                <View key={facility.id || index} className="bg-gray-200 rounded-xl p-4 mb-4">
                  <View className="flex-row items-start mb-2">
                    <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-3 mt-1">
                      <Text className="text-orange-600 text-xs font-bold">{index + 1}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-800 font-semibold text-base mb-1">
                        {facility.name}
                      </Text>
                      <Text className="text-gray-600 text-sm leading-5">
                        {facility.description}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Working Hours */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Working Hours</Text>
            <View className="bg-gray-50 rounded-xl p-4">
              {[
                { day: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
                { day: 'Saturday', time: '9:00 AM - 6:00 PM' },
                { day: 'Sunday', time: '10:00 AM - 4:00 PM' }
              ].map((schedule, index) => (
                <View key={index} className="flex-row justify-between py-2">
                  <Text className="text-gray-700 font-medium">{schedule.day}</Text>
                  <Text className="text-gray-600">{schedule.time}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Section */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Recent Reviews</Text>
            <View className="bg-gray-50 rounded-xl p-4">
              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <Text className="font-semibold text-gray-800 mr-2">Sarah M.</Text>
                  <View className="flex-row">
                    {[1,2,3,4,5].map(star => (
                      <Text key={star} className="text-yellow-500">⭐</Text>
                    ))}
                  </View>
                </View>
                <Text className="text-gray-600 text-sm">
                  "Excellent care for my dog! The staff is very professional and caring."
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-orange-600 font-semibold">View all reviews</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-20" />
      </ScrollView>

      {/* Fixed Bottom Action Buttons */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <View className="flex-row space-x-3">
          <TouchableOpacity 
            onPress={onCall}
            className="flex-1 bg-orange-100 py-4 rounded-xl"
          >
            <Text className="text-orange-600 text-center text-lg font-bold">📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onBookAppointment}
            className="flex-1 bg-orange-500 py-4 rounded-xl"
          >
            <Text className="text-white text-center text-lg font-bold">Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
