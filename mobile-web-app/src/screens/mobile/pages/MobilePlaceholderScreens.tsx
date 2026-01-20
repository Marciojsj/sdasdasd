import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MobileLayout } from '../../../components/mobile/layout';
import { Colors, Spacing, FontSize } from '../../../styles/theme';

interface PlaceholderScreenProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

export const MobilePlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  icon,
  description,
}) => {
  return (
    <MobileLayout title={title} scrollable={false}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={40} color={Colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.comingSoon}>🚧 Em breve</Text>
      </View>
    </MobileLayout>
  );
};

// Telas pré-configuradas
export const MobileCalendarScreen = () => (
  <MobilePlaceholderScreen
    title="Agenda"
    icon="calendar"
    description="Gerencie sua agenda, compromissos e eventos"
  />
);

export const MobileSalesScreen = () => (
  <MobilePlaceholderScreen
    title="Vendas"
    icon="cart"
    description="Acompanhe vendas, pedidos e faturamento"
  />
);

export const MobileServicesScreen = () => (
  <MobilePlaceholderScreen
    title="Serviços"
    icon="construct"
    description="Gerencie seus serviços e ofertas"
  />
);

export const MobileOrganizationsScreen = () => (
  <MobilePlaceholderScreen
    title="Organizações"
    icon="business"
    description="Gerencie organizações e equipes"
  />
);

export const MobileInsightsScreen = () => (
  <MobilePlaceholderScreen
    title="Relatórios"
    icon="analytics"
    description="Visualize análises e insights do negócio"
  />
);

export const MobileMessagesScreen = () => (
  <MobilePlaceholderScreen
    title="Mensagens"
    icon="chatbubbles"
    description="Gerencie conversas e mensagens"
  />
);

export const MobileSettingsScreen = () => (
  <MobilePlaceholderScreen
    title="Configurações"
    icon="settings"
    description="Configure sua conta e preferências"
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  comingSoon: {
    fontSize: FontSize.md,
    color: Colors.warning,
    fontWeight: '600',
  },
});
