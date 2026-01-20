import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from './theme';

export const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPadded: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  // Text
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  bodyText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  mutedText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  
  // Inputs
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  inputFocused: {
    borderColor: Colors.inputFocus,
  },
  inputError: {
    borderColor: Colors.error,
  },
  
  // Buttons
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonSecondaryText: {
    color: Colors.primary,
  },
  buttonDisabled: {
    backgroundColor: Colors.surfaceLight,
    opacity: 0.6,
  },
  
  // Links
  link: {
    color: Colors.primary,
    fontSize: FontSize.md,
  },
  
  // Spacing
  marginTop: {
    marginTop: Spacing.md,
  },
  marginBottom: {
    marginBottom: Spacing.md,
  },
  
  // Flex
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
