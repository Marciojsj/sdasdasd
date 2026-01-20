import { Platform, Dimensions } from 'react-native';
import { WebRegisterScreen } from '../src/screens/web/auth';
import { MobileRegisterScreen } from '../src/screens/mobile/auth';

export default function RegisterScreen() {
  const { width } = Dimensions.get('window');
  const isMobileViewport = Platform.OS !== 'web' || width < 768;

  if (isMobileViewport) {
    return <MobileRegisterScreen />;
  }

  return <WebRegisterScreen />;
}
