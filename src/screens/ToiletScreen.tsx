import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/src/theme/colors.ts'

const ToiletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚽 Toilet Cleaning Services</Text>
    </View>
  );
};

export default ToiletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
