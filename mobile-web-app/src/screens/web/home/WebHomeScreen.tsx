import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebLayout } from '../../../components/web/layout';
import { Colors, Spacing, FontSize } from '../../../styles/theme';

export const WebHomeScreen: React.FC = () => {
  return (
    <WebLayout title="Início" subtitle="Sua página inicial">
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="home" size={80} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Início</Text>
        <Text style={styles.description}>
          Sua página inicial com informações e atalhos
        </Text>
        <Text style={styles.comingSoon}>🚧 Em breve</Text>
      </View>
    </WebLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    minHeight: 400,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: 400,
  },
  comingSoon: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});
