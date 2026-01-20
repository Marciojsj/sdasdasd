import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../../styles/theme';

interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
  containerStyle,
}) => {
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={() => !disabled && onToggle(!checked)}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && <View style={styles.checkmark} />}
      </View>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: Colors.white,
  },
  label: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  labelDisabled: {
    opacity: 0.5,
  },
});
