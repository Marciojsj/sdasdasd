import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WebSidebar } from './WebSidebar';
import { WebHeader } from './WebHeader';
import { Colors, Spacing } from '../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

interface WebLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    label?: string;
  };
}

export const WebLayout: React.FC<WebLayoutProps> = ({
  children,
  title,
  subtitle,
  showSearch = true,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <WebSidebar />
      <View style={styles.main}>
        <WebHeader
          title={title}
          subtitle={subtitle}
          showSearch={showSearch}
          rightAction={rightAction}
        />
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.xl,
    minHeight: '100%',
  },
});
