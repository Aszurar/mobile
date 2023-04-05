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
};

export function SubmitButton({ title, onPress }: SubmitButtonProps) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <RectButton onPress={onPress} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
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
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
});
