import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { theme } from '@/src/theme/colors.ts';

export default function LocationScreen1() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>What&apos;s your location?</Text>
          <Text style={styles.subtitle}>
            We need your location to show you our serviceable hubs.
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.mockImage}>
            <Text style={styles.mockImageText}>City</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}
            activeOpacity={0.8}
            onPress={() => router.push('/location2')}>
            <Text style={styles.primaryButtonText}>Use current location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.6}
            onPress={() => router.push('/location2')}>
            <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
              Enter location manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, justifyContent: 'space-between' },
  headerContainer: { marginTop: 20 },
  title: { fontSize: 32, fontWeight: '800', color: theme.textDark, marginBottom: 12 },
  subtitle: { fontSize: 16, color: theme.textMuted, lineHeight: 24, fontWeight: '400' },
  imageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mockImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockImageText: { color: theme.textMuted, fontSize: 18 },
  bottomContainer: { paddingBottom: 30 },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: { fontSize: 18, color: '#fff', fontWeight: '700' },
  secondaryButton: { height: 50, justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { fontSize: 18, fontWeight: '700' },
});
