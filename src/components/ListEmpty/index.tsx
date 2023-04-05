import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SearchListSVG from '../../assets/icons/list-magnifying-glass.svg';
import THEME from '../../theme';

export function ListEmpty() {
  return (
    <View style={styles.container}>
      <SearchListSVG width={200} height={200} />
      <Text style={styles.title}>Nenhum projeto encontrado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: THEME.COLORS.WHITE,
    fontWeight: 'bold',
  },
});
