/**
 * Tipos de tradução para type-safety
 */

export interface TranslationKeys {
  // Comum
  common: {
    appName: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    viewAll: string;
    tryAgain: string;
    or: string;
  };

  // Autenticação
  auth: {
    login: {
      title: string;
      subtitle: string;
      welcomeBack: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      rememberMe: string;
      forgotPassword: string;
      signIn: string;
      noAccount: string;
      signUp: string;
      continueWith: string;
    };
    register: {
      title: string;
      subtitle: string;
      createAccount: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      cnpj: string;
      cnpjPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      verificationCode: string;
      verificationCodePlaceholder: string;
      verificationTitle: string;
      verificationSubtitle: string;
      phoneVerification: string;
      phoneVerificationInfo: string;
      resendCode: string;
      step1Title: string;
      step2Title: string;
      step3Title: string;
      alreadyHaveAccount: string;
      signIn: string;
      complete: string;
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      email: string;
      emailPlaceholder: string;
      sendResetLink: string;
      checkEmail: string;
      emailSentTo: string;
      checkSpam: string;
      tryAnotherEmail: string;
      backToLogin: string;
    };
    validation: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordMinLength: string;
      passwordUppercase: string;
      passwordLowercase: string;
      passwordNumber: string;
      passwordSpecial: string;
      passwordsDoNotMatch: string;
      nameRequired: string;
      cnpjRequired: string;
      cnpjInvalid: string;
      phoneRequired: string;
      phoneInvalid: string;
      verificationCodeRequired: string;
    };
  };

  // Home / Dashboard
  home: {
    greeting: {
      morning: string;
      afternoon: string;
      evening: string;
    };
    stats: {
      todaySales: string;
      totalSales: string;
      newCustomers: string;
      pendingOrders: string;
      activeServices: string;
    };
    sections: {
      quickActions: string;
      recentActivity: string;
      upcoming: string;
      upcomingSchedule: string;
    };
    actions: {
      sales: string;
      calendar: string;
      services: string;
      messages: string;
      newSale: string;
      schedule: string;
      sendMessage: string;
      viewReports: string;
    };
    activity: {
      newOrder: string;
      paymentReceived: string;
      paymentConfirmed: string;
      serviceScheduled: string;
      newMessage: string;
    };
    events: {
      clientMeeting: string;
      serviceCall: string;
      teamSync: string;
      serviceAppointment: string;
      teamStandup: string;
      meeting: string;
      service: string;
      internal: string;
    };
  };

  // Navegação
  nav: {
    home: string;
    calendar: string;
    sales: string;
    services: string;
    organizations: string;
    insights: string;
    messages: string;
    settings: string;
    logout: string;
  };

  // Páginas
  pages: {
    calendar: {
      title: string;
      subtitle: string;
    };
    sales: {
      title: string;
      subtitle: string;
    };
    services: {
      title: string;
      subtitle: string;
    };
    organizations: {
      title: string;
      subtitle: string;
    };
    insights: {
      title: string;
      subtitle: string;
    };
    messages: {
      title: string;
      subtitle: string;
    };
    settings: {
      title: string;
      subtitle: string;
    };
  };

  // Features
  features: {
    analytics: string;
    scheduling: string;
    collaboration: string;
  };

  // Branding
  branding: {
    tagline: string;
  };
}
