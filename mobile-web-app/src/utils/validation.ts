// CNPJ Validation
export const validateCNPJ = (cnpj: string): boolean => {
  // Remove formatting
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Check for known invalid CNPJs
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
  
  // Validate check digits
  let sum = 0;
  let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ[i]) * weight[i];
  }
  
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(cleanCNPJ[12]) !== digit1) return false;
  
  sum = 0;
  weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ[i]) * weight[i];
  }
  
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cleanCNPJ[13]) === digit2;
};

// Phone Validation (Brazilian format)
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  // Brazilian phone: 10 or 11 digits (with area code)
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

// Email Validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de Senha
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Format CNPJ
export const formatCNPJ = (value: string): string => {
  const cleanValue = value.replace(/[^\d]/g, '');
  return cleanValue
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
};

// Format Phone
export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/[^\d]/g, '');
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }
  return cleanValue
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};
