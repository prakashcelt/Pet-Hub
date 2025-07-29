import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';
import apiClient from '../../config/apiClient';

const useAuthStore = create((set, get) => ({
  // Auth state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Sign in action
  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });

      const { user, token } = response.data;
      
      // Store token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);
      console.log("CELT: Login successful, token stored:", token);
      const readData = async () => {
        const value = await AsyncStorage.getItem('authToken');
        console.log('Stored value:', value);
        };
        readData();

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, data: response.data };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message || 'Sign in failed',
        isAuthenticated: false,
      });
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },

  // Sign up action (for future use)
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true, data };
    } catch (error) {
      set({
        isLoading: false,
        error: error.message,
        isAuthenticated: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Sign out action
  signout: async () => {
    await AsyncStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Load token from AsyncStorage
  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        set({
          token,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.log("CELT: Error loading token:", error);
    }
  },

  // Check if user is authenticated
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        set({
          token,
          isAuthenticated: true,
        });
        return true;
      } else {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        return false;
      }
    } catch (error) {
      console.log("CELT: Error checking auth:", error);
      return false;
    }
  },
}));

export default useAuthStore;