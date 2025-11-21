import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import useAuthStore from "./zustand/auth";
import useBookingsStore from "./zustand/bookings";

export default function BookingsPage() {
  const { user, checkAuth } = useAuthStore();
  const { bookings, isLoading, error, fetchBookings } = useBookingsStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Check auth and load user data
    checkAuth();
  }, []);

  useEffect(() => {
    // Fetch bookings when user is available
    if (user?.id) {
      fetchBookings(user.id);
    }
  }, [user?.id]);

  // Pull to refresh functionality
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Check auth again
    await checkAuth();
    // Fetch bookings if user is available
    if (user?.id) {
      await fetchBookings(user.id);
    }
    setRefreshing(false);
  }, [user?.id, checkAuth, fetchBookings]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4 p-2 rounded-lg bg-gray-100"
          >
            <Text className="text-lg">←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800 flex-1">My Bookings</Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading && bookings.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#f97316" />
            <Text className="text-gray-600 mt-4">Loading bookings...</Text>
          </View>
        ) : error && bookings.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 py-20">
            <Text className="text-red-500 text-lg font-semibold mb-2">Error loading bookings</Text>
            <Text className="text-red-600 text-center mb-4">{error}</Text>
            <TouchableOpacity 
              onPress={() => user?.id && fetchBookings(user.id)}
              className="bg-orange-500 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : bookings.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 py-20">
            <Text className="text-6xl mb-4">📋</Text>
            <Text className="text-xl font-bold text-gray-800 mb-2">No Bookings Yet</Text>
            <Text className="text-gray-600 text-center mb-6">
              You don't have any bookings at the moment.
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/clinics')}
              className="bg-orange-500 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold">Browse Clinics</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="px-6 py-4">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              {bookings.length} Booking{bookings.length !== 1 ? 's' : ''}
            </Text>
            
            {bookings.map((booking, index) => (
              <View 
                key={booking.id || index}
                className="bg-white rounded-xl p-5 mb-4 border border-gray-200 shadow-sm"
              >
                {/* Header with Status */}
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-800 mb-2">
                      Booking #{booking.id || index + 1}
                    </Text>
                    {booking.status && (
                      <View className={`self-start px-3 py-1 rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100' :
                        booking.status === 'pending' ? 'bg-yellow-100' :
                        booking.status === 'cancelled' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        <Text className={`text-xs font-semibold ${
                          booking.status === 'confirmed' ? 'text-green-700' :
                          booking.status === 'pending' ? 'text-yellow-700' :
                          booking.status === 'cancelled' ? 'text-red-700' :
                          'text-gray-700'
                        }`}>
                          {booking.status.toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Facility Information */}
                <View className="mb-4 pb-4 border-b border-gray-200">
                  {booking.facility_name && (
                    <View className="mb-3">
                      <Text className="text-sm text-gray-500 mb-1">Facility Name</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        🏥 {booking.facility_name}
                      </Text>
                    </View>
                  )}
                  {booking.clinic_name && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Clinic Name</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        📍 {booking.clinic_name}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Date and Time */}
                <View className="mb-4 pb-4 border-b border-gray-200">
                  {booking.appointment_date && (
                    <View className="mb-3">
                      <Text className="text-sm text-gray-500 mb-1">Appointment Date</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        📅 {new Date(booking.appointment_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </View>
                  )}
                  {(booking.start_time || booking.end_time) && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Time</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        🕐 {booking.start_time || 'N/A'} - {booking.end_time || 'N/A'}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Additional Details */}
                <View className="space-y-3">
                  {booking.pet_name && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Pet Name</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        🐾 {booking.pet_name}
                      </Text>
                    </View>
                  )}
                  
                  {booking.customer_name && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Customer Name</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        👤 {booking.customer_name}
                      </Text>
                    </View>
                  )}

                  {booking.phone && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Contact Phone</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        📞 {booking.phone}
                      </Text>
                    </View>
                  )}

                  {booking.email && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Email</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        ✉️ {booking.email}
                      </Text>
                    </View>
                  )}

                  {booking.address && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Address</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        📍 {booking.address}
                      </Text>
                    </View>
                  )}

                  {booking.created_at && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Booked On</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        📝 {new Date(booking.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </View>
                  )}

                  {booking.updated_at && booking.updated_at !== booking.created_at && (
                    <View>
                      <Text className="text-sm text-gray-500 mb-1">Last Updated</Text>
                      <Text className="text-base font-semibold text-gray-800">
                        🔄 {new Date(booking.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

