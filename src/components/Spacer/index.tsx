import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  vertical?: number;
  horizontal?: number;
};

export function Spacer({ vertical = 0, horizontal = 0 }: SpacerProps) {
  return <View style={{ width: horizontal, height: vertical }} />;
}
