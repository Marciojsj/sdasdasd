import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  PressableProps,
} from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../styles/theme';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  textStyle,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`${variant}Text`],
            styles[`size_${size}_text`],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  size_sm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  size_md: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  size_lg: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.primary,
  },
  size_sm_text: {
    fontSize: FontSize.sm,
  },
  size_md_text: {
    fontSize: FontSize.md,
  },
  size_lg_text: {
    fontSize: FontSize.lg,
  },
});
