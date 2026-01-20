import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreenExpo from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from '../src/components/shared';
import { useAppStore, useAuthStore } from '../src/store';
import { Colors } from '../src/styles/theme';

// Prevent the splash screen from auto-hiding
SplashScreenExpo.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { isSplashVisible, setSplashVisible } = useAppStore();

  const [fontsLoaded] = useFonts({
    // Add any custom fonts here if needed
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading resources
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreenExpo.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  if (isSplashVisible) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
          <StatusBar style="light" />
          <SplashScreen onFinish={handleSplashFinish} duration={2500} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'fade',
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
