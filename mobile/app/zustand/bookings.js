import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBookingsStore = create((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,
  
  fetchBookings: async (customerId) => {
    console.log("CELT: fetchBookings called with customerId:", customerId);
    set({ isLoading: true, error: null });
    
    if (!customerId) {
      set({ 
        error: 'Customer ID is required', 
        isLoading: false 
      });
      return [];
    }
    
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      console.log("CELT: Token found:", token ? "Yes" : "No");
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log("CELT: Authorization header added");
      }
      
      // Build URL with query parameters
      const url = `${BASE_URL}/bookings?customer_id=${customerId}`;
      
      console.log("CELT: Making API call to:", url);
      const response = await axios.get(url, {
        headers
      });
      console.log("CELT: API Response get Bookings called");
      
      // Extract bookings array from response
      const bookingsData = response.data.bookings || response.data || [];
      set({ bookings: bookingsData, isLoading: false });
      
      return bookingsData;
    } catch (error) {
      console.log("CELT: API Error:", error.message);
      console.log("CELT: Full error:", error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch bookings', 
        isLoading: false 
      });
      return [];
    }
  },

  // Clear bookings
  clearBookings: () => {
    set({ 
      bookings: [], 
      isLoading: false, 
      error: null 
    });
  },
}));

export default useBookingsStore;

