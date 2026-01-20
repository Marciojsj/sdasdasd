/**
 * Sistema de Internacionalização (i18n)
 * 
 * Estrutura organizada para facilitar traduções e manutenção.
 * Para adicionar novo idioma: criar arquivo em ./locales e adicionar ao objeto locales
 */

export { pt } from './locales/pt';
export { useTranslation, t, setLanguage, getCurrentLanguage } from './useTranslation';
export type { TranslationKeys } from './types';
