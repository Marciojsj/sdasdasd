/**
 * Traduções em Português (Brasil)
 */

import type { TranslationKeys } from '../types';

export const pt: TranslationKeys = {
  // Comum
  common: {
    appName: 'Mobile Web App',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    search: 'Buscar',
    filter: 'Filtrar',
    viewAll: 'Ver tudo',
    tryAgain: 'Tentar novamente',
    or: 'ou',
  },

  // Autenticação
  auth: {
    login: {
      title: 'Entrar',
      subtitle: 'Entre para continuar',
      welcomeBack: 'Bem-vindo de volta',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      password: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      rememberMe: 'Lembrar de mim',
      forgotPassword: 'Esqueceu a senha?',
      signIn: 'Entrar',
      noAccount: 'Não tem uma conta?',
      signUp: 'Cadastrar',
      continueWith: 'ou continue com',
    },
    register: {
      title: 'Cadastro',
      subtitle: 'Crie sua conta para começar',
      createAccount: 'Criar Conta',
      fullName: 'Nome Completo',
      fullNamePlaceholder: 'Digite seu nome completo',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      password: 'Senha',
      passwordPlaceholder: 'Crie uma senha',
      confirmPassword: 'Confirmar Senha',
      confirmPasswordPlaceholder: 'Confirme sua senha',
      cnpj: 'CNPJ',
      cnpjPlaceholder: '00.000.000/0000-00',
      phone: 'Telefone',
      phonePlaceholder: '(00) 00000-0000',
      verificationCode: 'Código de Verificação',
      verificationCodePlaceholder: 'Digite o código de 6 dígitos',
      verificationTitle: 'Verifique seu telefone',
      verificationSubtitle: 'Enviamos um código de verificação para',
      phoneVerification: '📱 Verificação por Telefone',
      phoneVerificationInfo: 'Após completar esta etapa, enviaremos um código de verificação para seu número de telefone.',
      resendCode: 'Reenviar código',
      step1Title: 'Dados Pessoais',
      step2Title: 'Dados da Empresa',
      step3Title: 'Verificação',
      alreadyHaveAccount: 'Já tem uma conta?',
      signIn: 'Entrar',
      complete: 'Concluir Cadastro',
    },
    forgotPassword: {
      title: 'Esqueceu a senha?',
      subtitle: 'Não se preocupe! Digite seu e-mail e enviaremos um link para redefinir sua senha.',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      sendResetLink: 'Enviar Link de Redefinição',
      checkEmail: 'Verifique seu e-mail',
      emailSentTo: 'Enviamos um link de redefinição para',
      checkSpam: 'Não recebeu o e-mail? Verifique sua pasta de spam.',
      tryAnotherEmail: 'Tentar outro e-mail',
      backToLogin: 'Voltar para o login',
    },
    validation: {
      emailRequired: 'E-mail é obrigatório',
      emailInvalid: 'Formato de e-mail inválido',
      passwordRequired: 'Senha é obrigatória',
      passwordMinLength: 'A senha deve ter pelo menos 8 caracteres',
      passwordUppercase: 'A senha deve conter pelo menos uma letra maiúscula',
      passwordLowercase: 'A senha deve conter pelo menos uma letra minúscula',
      passwordNumber: 'A senha deve conter pelo menos um número',
      passwordSpecial: 'A senha deve conter pelo menos um caractere especial',
      passwordsDoNotMatch: 'As senhas não coincidem',
      nameRequired: 'Nome é obrigatório',
      cnpjRequired: 'CNPJ é obrigatório',
      cnpjInvalid: 'CNPJ inválido',
      phoneRequired: 'Telefone é obrigatório',
      phoneInvalid: 'Número de telefone inválido',
      verificationCodeRequired: 'Código de verificação é obrigatório',
    },
  },

  // Home / Dashboard
  home: {
    greeting: {
      morning: 'Bom dia',
      afternoon: 'Boa tarde',
      evening: 'Boa noite',
    },
    stats: {
      todaySales: 'Vendas de Hoje',
      totalSales: 'Total em Vendas',
      newCustomers: 'Novos Clientes',
      pendingOrders: 'Pedidos Pendentes',
      activeServices: 'Serviços Ativos',
    },
    sections: {
      quickActions: 'Ações Rápidas',
      recentActivity: 'Atividade Recente',
      upcoming: 'Próximos',
      upcomingSchedule: 'Agenda',
    },
    actions: {
      sales: 'Vendas',
      calendar: 'Calendário',
      services: 'Serviços',
      messages: 'Mensagens',
      newSale: 'Nova Venda',
      schedule: 'Agendar',
      sendMessage: 'Enviar Mensagem',
      viewReports: 'Ver Relatórios',
    },
    activity: {
      newOrder: 'Novo pedido',
      paymentReceived: 'Pagamento recebido',
      paymentConfirmed: 'Pagamento confirmado',
      serviceScheduled: 'Serviço agendado',
      newMessage: 'Nova mensagem do cliente',
    },
    events: {
      clientMeeting: 'Reunião com Cliente',
      serviceCall: 'Chamada de Serviço',
      teamSync: 'Sincronização da Equipe',
      serviceAppointment: 'Agendamento de Serviço',
      teamStandup: 'Reunião Diária',
      meeting: 'Reunião',
      service: 'Serviço',
      internal: 'Interno',
    },
  },

  // Navegação
  nav: {
    home: 'Início',
    calendar: 'Calendário',
    sales: 'Vendas',
    services: 'Serviços',
    organizations: 'Organizações',
    insights: 'Insights',
    messages: 'Mensagens',
    settings: 'Configurações',
    logout: 'Sair',
  },

  // Páginas
  pages: {
    calendar: {
      title: 'Calendário',
      subtitle: 'Gerencie sua agenda e compromissos',
    },
    sales: {
      title: 'Vendas',
      subtitle: 'Acompanhe e gerencie suas vendas',
    },
    services: {
      title: 'Serviços',
      subtitle: 'Gerencie seus serviços e ofertas',
    },
    organizations: {
      title: 'Organizações',
      subtitle: 'Gerencie suas organizações e parceiros',
    },
    insights: {
      title: 'Insights',
      subtitle: 'Análises e relatórios do seu negócio',
    },
    messages: {
      title: 'Mensagens',
      subtitle: 'Comunicação com clientes e equipe',
    },
    settings: {
      title: 'Configurações',
      subtitle: 'Personalize seu aplicativo',
    },
  },

  // Features
  features: {
    analytics: 'Análises em Tempo Real',
    scheduling: 'Agendamento Inteligente',
    collaboration: 'Colaboração em Equipe',
  },

  // Branding
  branding: {
    tagline: 'Gerencie seu negócio de qualquer lugar, em qualquer dispositivo',
  },
};
