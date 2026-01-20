import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
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

export const WebRegisterScreen: React.FC = () => {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [step, setStep] = useState(1);
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
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      // Simulate sending verification code
      setStep(3);
    }
  };

  const handleRegister = async () => {
    // In production, validate the verification code
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
      router.replace('/web/home');
    }
  };

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
        <Text style={styles.infoTitle}>📱 Verificação por Telefone</Text>
        <Text style={styles.infoText}>
          Após concluir esta etapa, enviaremos um código de verificação para seu telefone.
        </Text>
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <View style={styles.verificationHeader}>
        <Text style={styles.verificationEmoji}>📲</Text>
        <Text style={styles.verificationTitle}>Verifique seu telefone</Text>
        <Text style={styles.verificationSubtitle}>
          Enviamos um código de 6 dígitos para {formData.phone}
        </Text>
      </View>
      <Input
        label="Código de Verificação"
        value={formData.verificationCode}
        onChangeText={(v) => updateField('verificationCode', v)}
        placeholder="Digite o código de 6 dígitos"
        leftIcon="keypad-outline"
        keyboardType="numeric"
        maxLength={6}
        error={errors.verificationCode}
      />
      <Pressable style={styles.resendButton}>
        <Text style={styles.resendText}>Não recebeu o código? Reenviar</Text>
      </Pressable>
    </>
  );

  return (
    <View style={styles.container}>
      {/* Lado Esquerdo - Progresso */}
      <View style={styles.progressSide}>
        <View style={styles.progressContent}>
          <View style={styles.logoLarge}>
            <Text style={styles.logoEmoji}>📱</Text>
          </View>
          <Text style={styles.brandTitle}>Criar Conta</Text>
          
          <View style={styles.steps}>
            {[
              { num: 1, title: 'Dados Pessoais', desc: 'Nome, e-mail e senha' },
              { num: 2, title: 'Dados da Empresa', desc: 'CNPJ e telefone' },
              { num: 3, title: 'Verificação', desc: 'Confirme seu telefone' },
            ].map((s) => (
              <View key={s.num} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepNumber,
                    step >= s.num && styles.stepNumberActive,
                    step > s.num && styles.stepNumberComplete,
                  ]}
                >
                  {step > s.num ? (
                    <Text style={styles.stepCheck}>✓</Text>
                  ) : (
                    <Text style={[styles.stepNumText, step >= s.num && styles.stepNumTextActive]}>
                      {s.num}
                    </Text>
                  )}
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepTitle, step >= s.num && styles.stepTitleActive]}>
                    {s.title}
                  </Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Lado Direito - Formulário */}
      <ScrollView style={styles.formSide} contentContainerStyle={styles.formScrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {step === 1 && 'Dados Pessoais'}
            {step === 2 && 'Dados da Empresa'}
            {step === 3 && 'Verificação do Telefone'}
          </Text>
          <Text style={styles.formSubtitle}>
            {step === 1 && 'Comece informando seus dados básicos'}
            {step === 2 && 'Conte-nos sobre sua empresa'}
            {step === 3 && 'Último passo para verificar sua conta'}
          </Text>

          <View style={styles.formFields}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </View>

          <View style={styles.buttonRow}>
            {step > 1 && (
              <Button
                title="Voltar"
                variant="outline"
                onPress={() => setStep(step - 1)}
                style={styles.backButton}
              />
            )}
            <Button
              title={step === 3 ? 'Concluir Cadastro' : 'Continuar'}
              onPress={step === 3 ? handleRegister : handleNextStep}
              loading={isLoading}
              fullWidth={step === 1}
              style={step > 1 ? styles.continueButton : undefined}
            />
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem uma conta?</Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  progressSide: {
    width: 400,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    padding: Spacing.xxl,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  progressContent: {
    alignItems: 'center',
  },
  logoLarge: {
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
  brandTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xxl,
  },
  steps: {
    width: '100%',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stepNumberActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  stepNumberComplete: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  stepNumText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  stepNumTextActive: {
    color: Colors.white,
  },
  stepCheck: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  stepTitleActive: {
    color: Colors.text,
  },
  stepDesc: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  formSide: {
    flex: 1,
  },
  formScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  formContainer: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  formFields: {
    marginBottom: Spacing.lg,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.info,
    marginTop: Spacing.md,
  },
  infoTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  verificationHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: Spacing.md,
  },
  resendText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  backButton: {
    flex: 1,
  },
  continueButton: {
    flex: 2,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
