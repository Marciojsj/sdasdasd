import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, Shadow } from '../../../styles/theme';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  transparent?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  rightIcon,
  onRightPress,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + Spacing.sm },
        transparent && styles.transparent,
      ]}
    >
      <View style={styles.leftSection}>
        {showBack ? (
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSection}>
        {rightIcon ? (
          <Pressable style={styles.iconButton} onPress={onRightPress}>
            <Ionicons name={rightIcon} size={24} color={Colors.text} />
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  iconButton: {
    padding: Spacing.xs,
    borderRadius: 8,
  },
  placeholder: {
    width: 32,
    height: 32,
  },
});
