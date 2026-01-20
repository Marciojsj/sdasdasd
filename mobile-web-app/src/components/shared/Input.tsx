import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../styles/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry;
  const shouldHideText = isPasswordField && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={Colors.textMuted}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithLeftIcon]}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={shouldHideText}
          {...props}
        />
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIconContainer}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.textMuted}
            />
          </Pressable>
        )}
        {rightIcon && !isPasswordField && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
          >
            <Ionicons name={rightIcon} size={20} color={Colors.textMuted} />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
  },
  inputFocused: {
    borderColor: Colors.inputFocus,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  leftIcon: {
    marginLeft: Spacing.md,
  },
  rightIconContainer: {
    padding: Spacing.md,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
