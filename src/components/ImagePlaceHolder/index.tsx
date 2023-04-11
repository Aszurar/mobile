import React from 'react';

import ImagePlaceholder from "../../assets/icons/image-square.svg"

import { StyleSheet, Text, View } from 'react-native';
import THEME from '../../theme';

export function ImagePlaceHolder() {
  return (
    <View style={styles.container}>
      <ImagePlaceholder
        width={48}
        height={48}
        style={styles.icon}
      />
      <Text style={styles.imageSize}>até 1mb</Text>
      <Text style={styles.imageTypes}>png/jpg/jpeg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY_TRANSLUCENT,
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
  },
  icon: {
    marginBottom: -4,
  },
  imageSize: {
    fontSize: 12,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
    marginBottom: -4,
  },
  imageTypes: {
    fontSize: 12,
    color: THEME.COLORS.PRIMARY,
  }
})