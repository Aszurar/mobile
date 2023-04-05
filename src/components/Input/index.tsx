import React from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import THEME from '../../theme';

type InputProps = TextInputProps & {
  label: string;
};
export function Input({ label, ...rest }: InputProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  input: {
    height: 48,
    width: '100%',
    paddingHorizontal: 16,
    fontSize: 14,
    color: THEME.COLORS.BLACK,
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.PRIMARY,
  },
});
