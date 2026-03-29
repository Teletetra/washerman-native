import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

import { theme } from '@/src/theme/colors.ts'


export default function LocationScreen2() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchCurrentLocationAndGoDashboard = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to find nearby hubs.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log('Location fetched:', loc.coords);

      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Could not fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/location1')}>
          <Text style={styles.backIcon}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search your location</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card} />

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={fetchCurrentLocationAndGoDashboard}
          disabled={loading}>
          <View style={styles.cardRow}>
            <Text style={[styles.currentLocText, { color: theme.primary }]}>
              {loading ? 'Fetching...' : 'Use current location'}
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backButton: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: theme.surface, borderRadius: 10, borderWidth: 1, borderColor: theme.border, marginRight: 12 },
  backIcon: { color: theme.textDark, fontWeight: '700' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: theme.textDark },
  content: { paddingHorizontal: 20, paddingTop: 10 },
  card: { backgroundColor: theme.surface, borderRadius: 12, paddingHorizontal: 16, height: 60, marginBottom: 16, justifyContent: 'center', borderWidth: 1, borderColor: theme.border },
  cardRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  currentLocText: { fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: theme.textMuted, marginTop: 20, marginBottom: 10, letterSpacing: 1 },
});
