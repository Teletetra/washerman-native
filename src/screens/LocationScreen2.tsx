import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '@/src/theme/colors';

export default function LocationScreen2() {
  const router = useRouter();
  
  // States
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // --- 1. Auto-Fetch GPS Location ---
  const fetchCurrentLocationAndGoDashboard = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to find nearby hubs.');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      
      const geocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geocode.length > 0) {
        const city = geocode[0].city || geocode[0].subregion || geocode[0].district;
        const state = geocode[0].region;
        const formattedAddress = `${city}, ${state}`;
        
        await AsyncStorage.setItem('user_location', formattedAddress);
      } else {
        await AsyncStorage.setItem('user_location', 'Location Found');
      }

      router.replace('/dashboard');
    } catch (error: any) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Could not fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Manual Search Location ---
  const handleManualSearch = async () => {
    if (!searchQuery.trim()) return; // Don't search if box is empty
    
    setIsSearching(true);
    try {
      // Convert typed text into coordinates
      const geocodeResults = await Location.geocodeAsync(searchQuery);
      
      if (geocodeResults.length > 0) {
        const { latitude, longitude } = geocodeResults[0];
        
        // Convert coordinates back to a clean formatted address
        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        
        if (reverseGeocode.length > 0) {
          const city = reverseGeocode[0].city || reverseGeocode[0].subregion || reverseGeocode[0].district;
          const state = reverseGeocode[0].region;
          const formattedAddress = `${city}, ${state}`;
          await AsyncStorage.setItem('user_location', formattedAddress);
        } else {
          // Fallback if reverse geocode fails but search succeeds
          await AsyncStorage.setItem('user_location', searchQuery);
        }
        
        // Go to dashboard
        router.replace('/dashboard');
      } else {
        Alert.alert('Location Not Found', 'We could not find that area. Please try a different spelling or nearby landmark.');
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Something went wrong while searching. Please check your internet connection.');
    } finally {
      setIsSearching(false);
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
        
        {/* --- WORKING SEARCH BOX --- */}
        <View style={[styles.card, styles.searchCard]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for area, street name..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleManualSearch} // Triggers when user presses Enter/Search on keyboard
            returnKeyType="search"
            editable={!isSearching && !loading}
          />
          {isSearching && <ActivityIndicator size="small" color={theme.primary} />}
        </View>

        {/* --- CURRENT LOCATION BUTTON --- */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={fetchCurrentLocationAndGoDashboard}
          disabled={loading || isSearching}>
          <View style={styles.cardRow}>
            <Text style={[styles.currentLocText, { color: theme.primary }]}>
              {loading ? 'Fetching location...' : 'Use current location'}
            </Text>
            {loading && <ActivityIndicator size="small" color={theme.primary} style={{ marginLeft: 10 }} />}
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
  searchCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchInput: { flex: 1, height: '100%', fontSize: 16, color: theme.textDark },
  cardRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  currentLocText: { fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: theme.textMuted, marginTop: 20, marginBottom: 10, letterSpacing: 1 },
});