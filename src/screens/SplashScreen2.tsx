import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '@/src/theme/colors.ts'

export default function SplashScreen2() {


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.contentContainer}>
        {/* Main Brand Name */}
        <Text style={[styles.brandName, { color: theme.text }]}>
          Washerman
        </Text>

        {/* Divider / Loading Line */}
        <View style={[styles.dividerTrack, { backgroundColor: theme.divider }]}>
          <View style={[styles.dividerIndicator, { backgroundColor: theme.activeDivider }]} />
        </View>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Get professional house help{'\n'}in minutes!
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  brandName: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 20,
  },
  dividerTrack: {
    width: 200,
    height: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    borderRadius: 1,
  },
  dividerIndicator: {
    width: 60, // Mimics the brighter center part of the line in the image
    height: '100%',
    borderRadius: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.2,
  },
});