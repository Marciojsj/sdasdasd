import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebLayout } from '../../../components/web/layout';
import { Colors, Spacing, FontSize } from '../../../styles/theme';

interface PlaceholderScreenProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

export const WebPlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  icon,
  description,
}) => {
  return (
    <WebLayout title={title}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={48} color={Colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.comingSoon}>🚧 Em breve</Text>
      </View>
    </WebLayout>
  );
};

// Telas pré-configuradas
export const WebCalendarScreen = () => (
  <WebPlaceholderScreen
    title="Agenda"
    icon="calendar"
    description="Gerencie sua agenda, compromissos e eventos"
  />
);

export const WebSalesScreen = () => (
  <WebPlaceholderScreen
    title="Vendas"
    icon="cart"
    description="Acompanhe vendas, pedidos e faturamento"
  />
);

export const WebServicesScreen = () => (
  <WebPlaceholderScreen
    title="Serviços"
    icon="construct"
    description="Gerencie seus serviços e ofertas"
  />
);

export const WebOrganizationsScreen = () => (
  <WebPlaceholderScreen
    title="Organizações"
    icon="business"
    description="Gerencie organizações e equipes"
  />
);

export const WebInsightsScreen = () => (
  <WebPlaceholderScreen
    title="Relatórios"
    icon="analytics"
    description="Visualize análises e insights do negócio"
  />
);

export const WebMessagesScreen = () => (
  <WebPlaceholderScreen
    title="Fluxo de Mensagens"
    icon="chatbubbles"
    description="Gerencie conversas e mensagens"
  />
);

export const WebSettingsScreen = () => (
  <WebPlaceholderScreen
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
    padding: Spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxxl,
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
    fontSize: FontSize.lg,
    color: Colors.warning,
    fontWeight: '600',
  },
});
