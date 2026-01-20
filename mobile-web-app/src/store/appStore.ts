import { create } from 'zustand';

interface AppState {
  isAppReady: boolean;
  isSplashVisible: boolean;
  currentPlatform: 'web' | 'mobile';
  
  // Actions
  setAppReady: (ready: boolean) => void;
  setSplashVisible: (visible: boolean) => void;
  setPlatform: (platform: 'web' | 'mobile') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAppReady: false,
  isSplashVisible: true,
  currentPlatform: 'web',
  
  setAppReady: (ready: boolean) => set({ isAppReady: ready }),
  setSplashVisible: (visible: boolean) => set({ isSplashVisible: visible }),
  setPlatform: (platform: 'web' | 'mobile') => set({ currentPlatform: platform }),
}));
