import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';

// Simplified, well-formed auth store with persistence.
const authConfig = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
      const { user, token } = response.data;
      await AsyncStorage.setItem('authToken', token);
      set({ user, token, isAuthenticated: true, isLoading: false, error: null });
      return { success: true, data: response.data };
    } catch (err) {
      const message = (err && err.response && err.response.data && err.response.data.message) || err.message || 'Sign in failed';
      set({ isLoading: false, error: message, isAuthenticated: false });
      return { success: false, error: message };
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sign up failed');
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false, error: null });
      return { success: true, data };
    } catch (err) {
      set({ isLoading: false, error: err.message || 'Signup failed', isAuthenticated: false });
      return { success: false, error: err.message || 'Signup failed' };
    }
  },

  signout: async () => {
    await AsyncStorage.removeItem('authToken');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),

  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) set({ token, isAuthenticated: true });
    } catch (e) {
      console.log('Error loading token', e);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        set({ token, isAuthenticated: true });
        return true;
      }
      set({ user: null, token: null, isAuthenticated: false });
      return false;
    } catch (e) {
      console.log('Error checking auth', e);
      return false;
    }
  },
});

const useAuthStore = create(
  persist(authConfig, {
    name: 'auth-storage',
    // Wrap AsyncStorage with createJSONStorage for robust JSON (de)serialization
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
  })
);

export default useAuthStore;