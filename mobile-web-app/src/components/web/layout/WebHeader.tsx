import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, Shadow } from '../../../styles/theme';

interface WebHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    label?: string;
  };
}

export const WebHeader: React.FC<WebHeaderProps> = ({
  title,
  subtitle,
  showSearch = true,
  rightAction,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.actionsSection}>
        {showSearch && (
          <Pressable style={styles.searchContainer}>
            <Ionicons name="search" size={18} color={Colors.textMuted} />
            <Text style={styles.searchPlaceholder}>Buscar...</Text>
            <View style={styles.searchShortcut}>
              <Text style={styles.shortcutText}>⌘K</Text>
            </View>
          </Pressable>
        )}

        <Pressable style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={Colors.textSecondary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </Pressable>

        {rightAction && (
          <Pressable style={styles.actionButton} onPress={rightAction.onPress}>
            <Ionicons name={rightAction.icon} size={18} color={Colors.white} />
            {rightAction.label && (
              <Text style={styles.actionButtonText}>{rightAction.label}</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    minHeight: 70,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minWidth: 200,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    marginLeft: Spacing.sm,
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    flex: 1,
  },
  searchShortcut: {
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  shortcutText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  iconButton: {
    position: 'relative',
    padding: Spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    gap: Spacing.xs,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
