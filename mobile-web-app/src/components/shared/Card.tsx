import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../../styles/theme';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  iconColor = Colors.primary,
  children,
  onPress,
  style,
}) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={({ pressed }: { pressed?: boolean }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
