import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  cnpj?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  
  // Actions
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  phone: string;
}

// Simulated API delay
const simulateApiCall = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      rememberMe: false,

      login: async (email: string, password: string, rememberMe: boolean) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await simulateApiCall(1500);
          
          // Simulated successful login (any email/password works for now)
          const mockUser: User = {
            id: '1',
            email: email,
            name: email.split('@')[0],
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            rememberMe: rememberMe,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await simulateApiCall(2000);
          
          // Simulated successful registration
          const mockUser: User = {
            id: '1',
            email: data.email,
            name: data.name,
            cnpj: data.cnpj,
            phone: data.phone,
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          rememberMe: false,
        });
      },

      forgotPassword: async (_email: string) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call for sending email
          await simulateApiCall(1500);
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => 
        state.rememberMe 
          ? { user: state.user, isAuthenticated: state.isAuthenticated, rememberMe: state.rememberMe }
          : { rememberMe: false },
    }
  )
);
