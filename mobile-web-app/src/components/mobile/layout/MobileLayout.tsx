import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MobileHeader } from './MobileHeader';
import { MobileTabBar } from './MobileTabBar';
import { Colors, Spacing } from '../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

interface MobileLayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  showTabBar?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  scrollable?: boolean;
  padded?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBack = false,
  showTabBar = true,
  rightIcon,
  onRightPress,
  scrollable = true,
  padded = true,
}) => {
  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        padded && styles.padded,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, padded && styles.padded]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <MobileHeader
        title={title}
        showBack={showBack}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
      />
      {content}
      {showTabBar && <MobileTabBar />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  padded: {
    padding: Spacing.md,
  },
});
