/**
 * Hook e funções de tradução
 * 
 * Uso:
 * - Componentes: const { t } = useTranslation();
 * - Fora de componentes: import { t } from '@/i18n';
 */

import { pt } from './locales/pt';
import type { TranslationKeys } from './types';

// Idioma atual (pode ser expandido para suportar múltiplos idiomas)
let currentLanguage = 'pt';

// Mapa de idiomas disponíveis
const locales: Record<string, TranslationKeys> = {
  pt,
};

/**
 * Obtém tradução por caminho de chave
 * @example t('auth.login.title') => 'Entrar'
 */
export function t(keyPath: string): string {
  const translations = locales[currentLanguage] || pt;
  const keys = keyPath.split('.');
  
  let result: unknown = translations;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      console.warn(`Translation missing: ${keyPath}`);
      return keyPath;
    }
  }
  
  return typeof result === 'string' ? result : keyPath;
}

/**
 * Hook para usar traduções em componentes
 */
export function useTranslation() {
  return {
    t,
    locale: currentLanguage,
    translations: locales[currentLanguage] || pt,
  };
}

/**
 * Define o idioma atual
 */
export function setLanguage(language: string): void {
  if (locales[language]) {
    currentLanguage = language;
  } else {
    console.warn(`Language '${language}' not available. Available: ${Object.keys(locales).join(', ')}`);
  }
}

/**
 * Retorna o idioma atual
 */
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * Obtém saudação baseada na hora do dia
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return t('home.greeting.morning');
  } else if (hour < 18) {
    return t('home.greeting.afternoon');
  } else {
    return t('home.greeting.evening');
  }
}
