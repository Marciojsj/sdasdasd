import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MobileLayout } from '../../../components/mobile/layout';
import { Colors, Spacing, FontSize } from '../../../styles/theme';

export const MobileHomeScreen: React.FC = () => {
  return (
    <MobileLayout title="Início" scrollable={false}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="home" size={64} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Início</Text>
        <Text style={styles.description}>
          Sua página inicial com informações e atalhos
        </Text>
        <Text style={styles.comingSoon}>🚧 Em breve</Text>
      </View>
    </MobileLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  comingSoon: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});
