import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import THEME from '../../theme';


type IconNativeButtonProps = {
  enabled?: boolean;
  onPress: () => void;
  icon: React.FC<SvgProps>;
};

const buttonSizeDefault = 64;
const iconSizeDefault = 40;

export function IconNativeButton({
  icon: Icon,
  onPress,
  enabled,
}: IconNativeButtonProps) {


  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <RectButton style={styles.rectButton} onPress={onPress} enabled={enabled}>
          <Icon height={iconSizeDefault} width={iconSizeDefault} />
        </RectButton>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    height: buttonSizeDefault,
    width: buttonSizeDefault,
  },
  rectButton: {
    height: buttonSizeDefault,
    width: buttonSizeDefault,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  }
})