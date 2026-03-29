import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '@/src/theme/colors.ts'

export default function SplashScreen1() {


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.logoContainer, { backgroundColor: theme.primary }]}>
        <Text style={[styles.logoText, { color: theme.text }]}>
          Washerman
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 180,
    height: 180,
    borderRadius: 40, // Rounded corners to match the icon style
    justifyContent: 'center',
    alignItems: 'center',
    // Optional shadow for a slight 3D pop
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});