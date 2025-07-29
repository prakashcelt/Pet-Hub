import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useClinicsStore = create((set, get) => ({
  clinics: [],
  isLoading: false,
  error: null,
  
  // Clinic details state
  clinicDetails: null,
  isLoadingDetails: false,
  detailsError: null,
  
  fetchClinics: async () => {
    console.log("CELT: fetchClinics called");
    set({ isLoading: true, error: null });
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
      
      console.log("CELT: Making API call to:", `${BASE_URL}/external/clinics`);
      const response = await axios.get(`${BASE_URL}/external/clinics`, {
        headers
      });
      console.log("CELT: API Response get Clinincs called");
      
      // Extract clinics array from response
      const clinicsData = response.data.clinics || [];
      set({ clinics: clinicsData, isLoading: false });
    } catch (error) {
      console.log("CELT: API Error:", error.message);
      console.log("CELT: Full error:", error);
      set({ 
        error: error.response?.data?.message || error.message || 'Failed to fetch clinics', 
        isLoading: false 
      });
    }
  },

  // Fetch clinic details by ID
  fetchClinicDetails: async (clinicId, fallbackData = {}) => {
    console.log("CELT: fetchClinicDetails called for ID:", clinicId);
    set({ isLoadingDetails: true, detailsError: null, clinicDetails: null });
    
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      console.log("CELT: Token found for details:", token ? "Yes" : "No");
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      console.log("CELT: Making API call to:", `${BASE_URL}/external/facilities/${clinicId}`);
      const response = await axios.get(`${BASE_URL}/external/facilities/${clinicId}`, {
        headers
      });
      
      // console.log("CELT: Clinic details response:", response.data);
      set({ 
        clinicDetails: response.data, 
        isLoadingDetails: false,
        detailsError: null
      });
      
      return response.data;
    } catch (error) {
      console.log("CELT: Error fetching clinic details:", error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch clinic details';
      
      // Set fallback data if API fails
      const fallbackDetails = {
        id: clinicId,
        ...fallbackData
      };
      
      set({ 
        detailsError: errorMessage,
        isLoadingDetails: false,
        clinicDetails: fallbackDetails
      });
      
      return fallbackDetails;
    }
  },

  // Clear clinic details
  clearClinicDetails: () => {
    set({ 
      clinicDetails: null, 
      isLoadingDetails: false, 
      detailsError: null 
    });
  }
}));

export default useClinicsStore;