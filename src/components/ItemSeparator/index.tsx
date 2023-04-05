import React from 'react';
import { StyleSheet, View } from 'react-native';

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
});
