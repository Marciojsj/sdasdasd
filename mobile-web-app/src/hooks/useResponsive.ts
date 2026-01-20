import { useState, useEffect, useCallback } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ResponsiveBreakpoints {
  xs: boolean;  // < 480
  sm: boolean;  // >= 480
  md: boolean;  // >= 768
  lg: boolean;  // >= 1024
  xl: boolean;  // >= 1280
}

interface ResponsiveInfo extends ResponsiveBreakpoints {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  const handleDimensionsChange = useCallback(({ window }: { window: ScaledSize }) => {
    setDimensions(window);
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    return () => subscription?.remove();
  }, [handleDimensionsChange]);

  const { width, height } = dimensions;

  return {
    width,
    height,
    isPortrait: height > width,
    isLandscape: width > height,
    xs: width < 480,
    sm: width >= 480,
    md: width >= 768,
    lg: width >= 1024,
    xl: width >= 1280,
  };
};
