import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { Platform, Dimensions } from 'react-native';
import { useAuthStore } from '../src/store';

export default function Index() {
  const { isAuthenticated } = useAuthStore();
  
  // Determine if we should use mobile or web layout
  const { width } = Dimensions.get('window');
  const isMobileViewport = Platform.OS !== 'web' || width < 768;
  
  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href={isMobileViewport ? '/mobile/home' : '/web/home'} />;
  }
  
  // Otherwise, redirect to login
  return <Redirect href="/login" />;
}
