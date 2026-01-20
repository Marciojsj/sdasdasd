import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const usePlatform = () => {
  const isWeb = Platform.OS === 'web';
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  
  // For web, check viewport width to determine if it's mobile viewport
  const isMobileViewport = width < 768;
  const isTabletViewport = width >= 768 && width < 1024;
  const isDesktopViewport = width >= 1024;
  
  // Determine layout type
  const shouldUseMobileLayout = isMobile || (isWeb && isMobileViewport);
  const shouldUseWebLayout = isWeb && !isMobileViewport;
  
  return {
    isWeb,
    isMobile,
    isIOS,
    isAndroid,
    isMobileViewport,
    isTabletViewport,
    isDesktopViewport,
    shouldUseMobileLayout,
    shouldUseWebLayout,
    screenWidth: width,
    screenHeight: height,
    platform: Platform.OS,
  };
};
