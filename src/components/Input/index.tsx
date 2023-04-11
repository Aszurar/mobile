import React, { RefObject } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import THEME from '../../theme';

const CHARACTERS_LIMIT = 150;

type InputProps = TextInputProps & {
  label: string;
  isOptional?: boolean;
  height?: number;
  limit?: number;
  errorMessage?: string;
  inputRef?: RefObject<TextInput>;
};
export function Input({ label, height, value, multiline, inputRef, isOptional = false, errorMessage, ...rest }: InputProps) {
  const inputHeight = height || 48;
  const isInvalid = errorMessage && !value;
  const currentCharacters = value ? value.length : 0;

  const borderBottomColor = isInvalid ? THEME.COLORS.DELETE : THEME.COLORS.PRIMARY;

  const inputHeightStyle = { height: inputHeight }
  const borderBottomColorStyle = { borderBottomColor }




  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}{!isOptional && <Text style={styles.labelObrigatory}>*</Text>}</Text>
        {
          currentCharacters > 0 && multiline &&
          (
            <Text style={[styles.label]}><Text style={styles.currentCharactersLimit}>{currentCharacters}</Text>/<Text style={styles.charactersLimit}>{CHARACTERS_LIMIT}</Text></Text>
          )
        }
      </View>
      <TextInput ref={inputRef} value={value} {...rest} style={[styles.input, inputHeightStyle, borderBottomColorStyle]} />
      {
        isInvalid &&
        (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  charactersLimit: {
    fontWeight: 'bold',
  },
  currentCharactersLimit: {
    color: THEME.COLORS.PRIMARY,
  },
  labelObrigatory: {
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    fontSize: 14,
    color: THEME.COLORS.BLACK,
    borderRadius: 12,
    borderBottomWidth: 1,
  },
  errorMessage: {
    fontSize: 12,
    color: THEME.COLORS.DELETE,
  }
});
