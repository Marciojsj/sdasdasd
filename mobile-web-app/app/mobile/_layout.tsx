import { Stack } from 'expo-router';
import { Colors } from '../../src/styles/theme';

export default function MobileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
