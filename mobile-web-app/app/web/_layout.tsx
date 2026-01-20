import { Stack } from 'expo-router';
import { Colors } from '../../src/styles/theme';

export default function WebLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: 'fade',
      }}
    />
  );
}
