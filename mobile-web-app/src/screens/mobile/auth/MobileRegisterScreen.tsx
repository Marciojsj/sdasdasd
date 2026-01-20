import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input, Button } from '../../../components/shared';
import { useAuthStore } from '../../../store';
import {
  validateEmail,
  validateCNPJ,
  validatePhone,
  validatePassword,
  formatCNPJ,
  formatPhone,
} from '../../../utils/validation';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../styles/theme';

export const MobileRegisterScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { register, isLoading } = useAuthStore();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cnpj: '',
    phone: '',
    verificationCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (field === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Número de telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleRegister = async () => {
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Código de verificação é obrigatório' });
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      cnpj: formData.cnpj,
      phone: formData.phone,
    });

    if (success) {
      router.replace('/mobile/home');
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={styles.progressItem}>
          <View
            style={[
              styles.progressDot,
              step >= s && styles.progressDotActive,
              step > s && styles.progressDotComplete,
            ]}
          >
            {step > s ? (
              <Ionicons name="checkmark" size={12} color={Colors.white} />
            ) : (
              <Text style={[styles.progressNum, step >= s && styles.progressNumActive]}>
                {s}
              </Text>
            )}
          </View>
          {s < 3 && (
            <View style={[styles.progressLine, step > s && styles.progressLineActive]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <>
      <Input
        label="Nome Completo"
        value={formData.name}
        onChangeText={(v) => updateField('name', v)}
        placeholder="Digite seu nome completo"
        leftIcon="person-outline"
        error={errors.name}
      />
      <Input
        label="E-mail"
        value={formData.email}
        onChangeText={(v) => updateField('email', v)}
        placeholder="Digite seu e-mail"
        leftIcon="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <Input
        label="Senha"
        value={formData.password}
        onChangeText={(v) => updateField('password', v)}
        placeholder="Crie uma senha"
        leftIcon="lock-closed-outline"
        secureTextEntry
        error={errors.password}
      />
      <Input
        label="Confirmar Senha"
        value={formData.confirmPassword}
        onChangeText={(v) => updateField('confirmPassword', v)}
        placeholder="Confirme sua senha"
        leftIcon="lock-closed-outline"
        secureTextEntry
        error={errors.confirmPassword}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <Input
        label="CNPJ"
        value={formData.cnpj}
        onChangeText={(v) => updateField('cnpj', v)}
        placeholder="00.000.000/0000-00"
        leftIcon="business-outline"
        keyboardType="numeric"
        error={errors.cnpj}
      />
      <Input
        label="Telefone"
        value={formData.phone}
        onChangeText={(v) => updateField('phone', v)}
        placeholder="(00) 00000-0000"
        leftIcon="call-outline"
        keyboardType="phone-pad"
        error={errors.phone}
      />
      <View style={styles.infoBox}>
        <Text style={styles.infoEmoji}>📱</Text>
        <Text style={styles.infoText}>
          Enviaremos um código de verificação para este número
        </Text>
      </View>
    </>
  );

  const renderStep3 = () => (
    <View style={styles.verificationContainer}>
      <Text style={styles.verificationEmoji}>📲</Text>
      <Text style={styles.verificationTitle}>Verificar Telefone</Text>
      <Text style={styles.verificationSubtitle}>
        Digite o código de 6 dígitos enviado para{'\n'}{formData.phone}
      </Text>
      <Input
        value={formData.verificationCode}
        onChangeText={(v) => updateField('verificationCode', v)}
        placeholder="000000"
        leftIcon="keypad-outline"
        keyboardType="numeric"
        maxLength={6}
        error={errors.verificationCode}
        containerStyle={styles.codeInput}
      />
      <Pressable style={styles.resendButton}>
        <Text style={styles.resendText}>Reenviar código</Text>
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Cabeçalho */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <Pressable style={styles.backButton} onPress={() => step > 1 ? setStep(step - 1) : router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Criar Conta</Text>
        <View style={styles.placeholder} />
      </View>

      {renderProgressBar()}

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing.xl }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.stepTitle}>
          {step === 1 && 'Dados Pessoais'}
          {step === 2 && 'Dados da Empresa'}
          {step === 3 && 'Verificação'}
        </Text>
        <Text style={styles.stepSubtitle}>
          {step === 1 && 'Conte-nos sobre você'}
          {step === 2 && 'Detalhes do seu negócio'}
          {step === 3 && 'Quase lá!'}
        </Text>

        <View style={styles.form}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </View>

        <Button
          title={step === 3 ? 'Concluir Cadastro' : 'Continuar'}
          onPress={step === 3 ? handleRegister : handleNext}
          loading={isLoading}
          fullWidth
          size="lg"
        />

        {step === 1 && (
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem uma conta?</Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Entrar</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  progressDotComplete: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  progressNum: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  progressNumActive: {
    color: Colors.white,
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs,
  },
  progressLineActive: {
    backgroundColor: Colors.success,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  stepTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  stepSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  verificationContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  verificationEmoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  verificationTitle: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  verificationSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  codeInput: {
    width: '100%',
  },
  resendButton: {
    marginTop: Spacing.md,
  },
  resendText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  loginLink: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: '600',
  },
});
