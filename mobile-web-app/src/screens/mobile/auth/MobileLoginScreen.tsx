import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input, Button, Checkbox } from '../../../components/shared';
import { useAuthStore } from '../../../store';
import { validateEmail } from '../../../utils/validation';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../styles/theme';

export const MobileLoginScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const success = await login(email, password, rememberMe);

    if (success) {
      router.replace('/mobile/home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + Spacing.xl, paddingBottom: insets.bottom + Spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>📱</Text>
          </View>
          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre para continuar</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            leftIcon="lock-closed-outline"
            secureTextEntry
            error={errors.password}
          />

          <View style={styles.optionsRow}>
            <Checkbox
              checked={rememberMe}
              onToggle={setRememberMe}
              label="Lembrar-me"
            />
            <Pressable onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotLink}>Esqueceu a senha?</Text>
            </Pressable>
          </View>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="lg"
          />
        </View>

        {/* Divisor */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Botões Sociais */}
        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.socialIcon}>🍎</Text>
          </Pressable>
        </View>

        {/* Cadastro */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <Pressable onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.xs,
  },
  forgotLink: {
    color: Colors.primary,
    fontSize: FontSize.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  registerLink: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '600',
  },
});
