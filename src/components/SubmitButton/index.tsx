import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import THEME from '../../theme';

type SubmitButtonProps = {
  onPress: () => void;
  title: string;
  type?: "primary" | "secondary";
};

export function SubmitButton({ type = "secondary", title, onPress, }: SubmitButtonProps) {
  const backgroundColor = type === "primary" ? THEME.COLORS.PRIMARY : THEME.COLORS.WHITE;
  const textColor = type === "primary" ? THEME.COLORS.WHITE : THEME.COLORS.PRIMARY;
  const backgroundColorStyle = { backgroundColor };
  const textColorStyle = { color: textColor };
  return (
    <GestureHandlerRootView style={styles.container}>
      <RectButton onPress={onPress} style={[styles.button, backgroundColorStyle]}>
        <Text style={[styles.title, textColorStyle]}>{title}</Text>
      </RectButton>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
  },
  button: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
