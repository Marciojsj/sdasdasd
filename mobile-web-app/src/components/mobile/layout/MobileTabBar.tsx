import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize } from '../../../styles/theme';

interface TabItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconOutline: keyof typeof Ionicons.glyphMap;
  route: string;
}

const tabItems: TabItem[] = [
  { label: 'Início', icon: 'home', iconOutline: 'home-outline', route: '/mobile/home' },
  { label: 'Agenda', icon: 'calendar', iconOutline: 'calendar-outline', route: '/mobile/calendar' },
  { label: 'Vendas', icon: 'cart', iconOutline: 'cart-outline', route: '/mobile/sales' },
  { label: 'Relatórios', icon: 'analytics', iconOutline: 'analytics-outline', route: '/mobile/insights' },
  { label: 'Config.', icon: 'settings', iconOutline: 'settings-outline', route: '/mobile/settings' },
];

export const MobileTabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom || Spacing.sm }]}>
      {tabItems.map((item) => {
        const isActive = pathname === item.route || pathname.startsWith(item.route);
        return (
          <Pressable
            key={item.route}
            style={styles.tabItem}
            onPress={() => handleNavigation(item.route)}
          >
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
              <Ionicons
                name={isActive ? item.icon : item.iconOutline}
                size={22}
                color={isActive ? Colors.primary : Colors.textMuted}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
  },
  iconContainer: {
    padding: Spacing.xs,
    borderRadius: 12,
    marginBottom: 2,
  },
  iconContainerActive: {
    backgroundColor: `${Colors.primary}20`,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
