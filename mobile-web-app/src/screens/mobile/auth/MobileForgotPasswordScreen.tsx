import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from '../../../components/shared';
import { useAuthStore } from '../../../store';
import { validateEmail } from '../../../utils/validation';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../styles/theme';

export const MobileForgotPasswordScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { forgotPassword, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('E-mail é obrigatório');
      return;
    }

    if (!validateEmail(email)) {
      setError('Formato de e-mail inválido');
      return;
    }

    setError('');
    const success = await forgotPassword(email);

    if (success) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>📧</Text>
          </View>
          <Text style={styles.title}>Verifique seu e-mail</Text>
          <Text style={styles.description}>
            Enviamos um link de recuperação de senha para
          </Text>
          <Text style={styles.emailHighlight}>{email}</Text>
          <Text style={styles.hint}>
            Não recebeu? Verifique sua caixa de spam ou tente novamente.
          </Text>
          <Button
            title="Tentar outro e-mail"
            variant="outline"
            onPress={() => setIsSubmitted(false)}
            fullWidth
            style={styles.button}
          />
          <Pressable onPress={() => router.push('/login')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={16} color={Colors.primary} />
            <Text style={styles.backText}>Voltar para o login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <Pressable style={styles.headerBackButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.lockEmoji}>🔐</Text>
        </View>
        <Text style={styles.title}>Esqueceu a senha?</Text>
        <Text style={styles.description}>
          Sem problemas! Digite seu e-mail e enviaremos um link para recuperar sua senha.
        </Text>

        <Input
          label="E-mail"
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            setError('');
          }}
          placeholder="Digite seu e-mail"
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
          containerStyle={styles.input}
        />

        <Button
          title="Enviar Link de Recuperação"
          onPress={handleSubmit}
          loading={isLoading}
          fullWidth
          size="lg"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  lockEmoji: {
    fontSize: 40,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.success}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successEmoji: {
    fontSize: 50,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  emailHighlight: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.lg,
  },
  hint: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  input: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  button: {
    marginBottom: Spacing.lg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  backText: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: '500',
    marginLeft: Spacing.xs,
  },
});
