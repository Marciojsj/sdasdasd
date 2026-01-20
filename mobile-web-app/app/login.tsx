import { Platform, Dimensions } from 'react-native';
import { WebLoginScreen } from '../src/screens/web/auth';
import { MobileLoginScreen } from '../src/screens/mobile/auth';

export default function LoginScreen() {
  const { width } = Dimensions.get('window');
  const isMobileViewport = Platform.OS !== 'web' || width < 768;

  if (isMobileViewport) {
    return <MobileLoginScreen />;
  }

  return <WebLoginScreen />;
}
