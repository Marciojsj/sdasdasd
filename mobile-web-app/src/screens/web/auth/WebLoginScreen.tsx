import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Button, Checkbox } from '../../../components/shared';
import { useAuthStore } from '../../../store';
import { validateEmail } from '../../../utils/validation';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../styles/theme';

export const WebLoginScreen: React.FC = () => {
  const router = useRouter();
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
      router.replace('/web/home');
    }
  };

  return (
    <View style={styles.container}>
      {/* Lado Esquerdo - Branding */}
      <View style={styles.brandingSide}>
        <View style={styles.brandingContent}>
          <View style={styles.logoLarge}>
            <Text style={styles.logoEmoji}>📱</Text>
          </View>
          <Text style={styles.brandTitle}>Mobile Web App</Text>
          <Text style={styles.brandSubtitle}>
            Sua plataforma completa de gestão empresarial
          </Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Análises em tempo real</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📅</Text>
              <Text style={styles.featureText}>Agendamento inteligente</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureText}>Colaboração em equipe</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Lado Direito - Formulário de Login */}
      <View style={styles.formSide}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Bem-vindo de volta</Text>
          <Text style={styles.formSubtitle}>
            Entre com suas credenciais para acessar sua conta
          </Text>

          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            leftIcon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            containerStyle={styles.input}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            leftIcon="lock-closed-outline"
            secureTextEntry
            error={errors.password}
            containerStyle={styles.input}
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
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </Pressable>
          </View>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não tem uma conta?</Text>
            <Pressable onPress={() => router.push('/register')}>
              <Text style={styles.registerLink}>Cadastre-se</Text>
            </Pressable>
          </View>
        </View>
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
  brandingSide: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  brandingContent: {
    maxWidth: 400,
    alignItems: 'center',
  },
  logoLarge: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoEmoji: {
    fontSize: 60,
  },
  brandTitle: {
    fontSize: FontSize.display,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  brandSubtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  features: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  formSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  formTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  input: {
    marginBottom: Spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  forgotLink: {
    color: Colors.primary,
    fontSize: FontSize.sm,
  },
  loginButton: {
    marginBottom: Spacing.lg,
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
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  socialIcon: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  socialText: {
    fontSize: FontSize.md,
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
