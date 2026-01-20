import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Colors, Spacing, FontSize, Shadow } from '../../../styles/theme';
import { useAuthStore } from '../../../store';

interface NavItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const navItems: NavItem[] = [
  { label: 'Início', icon: 'home', route: '/web/home' },
  { label: 'Agenda', icon: 'calendar', route: '/web/calendar' },
  { label: 'Vendas', icon: 'cart', route: '/web/sales' },
  { label: 'Serviços', icon: 'construct', route: '/web/services' },
  { label: 'Organizações', icon: 'business', route: '/web/organizations' },
  { label: 'Relatórios', icon: 'analytics', route: '/web/insights' },
  { label: 'Mensagens', icon: 'chatbubbles', route: '/web/messages' },
  { label: 'Configurações', icon: 'settings', route: '/web/settings' },
];

export const WebSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.sidebar}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>📱</Text>
        </View>
        <Text style={styles.appName}>Mobile Web App</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(item.route);
          return (
            <Pressable
              key={item.route}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => handleNavigation(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={isActive ? Colors.primary : Colors.textSecondary}
              />
              <Text
                style={[styles.navLabel, isActive && styles.navLabelActive]}
              >
                {item.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>

      {/* User Section */}
      <View style={styles.userSection}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>
        </View>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    backgroundColor: Colors.backgroundLight,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingVertical: Spacing.lg,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  logoText: {
    fontSize: 20,
  },
  appName: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  navContainer: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.xs,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: `${Colors.primary}15`,
  },
  navLabel: {
    marginLeft: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  navLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: '25%',
    bottom: '25%',
    width: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  userSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  userEmail: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  logoutText: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.error,
  },
});
