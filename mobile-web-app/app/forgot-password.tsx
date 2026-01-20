import { Platform, Dimensions } from 'react-native';
import { WebForgotPasswordScreen } from '../src/screens/web/auth';
import { MobileForgotPasswordScreen } from '../src/screens/mobile/auth';

export default function ForgotPasswordScreen() {
  const { width } = Dimensions.get('window');
  const isMobileViewport = Platform.OS !== 'web' || width < 768;

  if (isMobileViewport) {
    return <MobileForgotPasswordScreen />;
  }

  return <WebForgotPasswordScreen />;
}
