import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '@/src/theme/colors';

export default function LocationScreen1() {
  const router = useRouter();
  
  // States for Map and Location
  const [location, setLocation] = useState<any>(null);
  const [addressName, setAddressName] = useState('Fetching location...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 1. Request Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddressName('Permission denied');
        setIsLoading(false);
        return;
      }

      // 2. Get GPS Coordinates
      let currentPosition = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.05, // Zoom level
        longitudeDelta: 0.05,
      };
      setLocation(coords);

      // 3. Convert GPS to City Name (Reverse Geocoding)
      let geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (geocode.length > 0) {
        // e.g., "Noida, Uttar Pradesh"
        const city = geocode[0].city || geocode[0].subregion || geocode[0].district;
        const state = geocode[0].region;
        const finalAddress = `${city}, ${state}`;
        setAddressName(finalAddress);
      }
      
      setIsLoading(false);
    })();
  }, []);

  // When user clicks "Use current location"
  const handleUseCurrentLocation = async () => {
    if (addressName !== 'Fetching location...' && addressName !== 'Permission denied') {
      // Save it to phone storage so Dashboard can read it
      await AsyncStorage.setItem('user_location', addressName);
    }
    // Navigate to dashboard (or wherever your flow goes next)
    router.push('/dashboard'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>What's your location?</Text>
          <Text style={styles.subtitle}>
            We need your location to show you our serviceable hubs.
          </Text>
        </View>

        {/* --- MAP SECTION --- */}
        <View style={styles.imageContainer}>
          <View style={styles.mapWrapper}>
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.primary} />
            ) : location ? (
              <MapView 
                style={styles.map} 
                initialRegion={location}
                showsUserLocation={true}
              >
                <Marker 
                  coordinate={location} 
                  title="Your Location" 
                  description={addressName} 
                />
              </MapView>
            ) : (
              <Text style={styles.mockImageText}>{addressName}</Text>
            )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}
            activeOpacity={0.8}
            onPress={handleUseCurrentLocation}
          >
            <Text style={styles.primaryButtonText}>Use current location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.6}
            onPress={() => router.push('/location2')}
          >
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
  imageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  mapWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Keeps the map corners rounded
    borderWidth: 1,
    borderColor: theme.border,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mockImageText: { color: theme.textMuted, fontSize: 18 },
  bottomContainer: { paddingBottom: 30 },
  primaryButton: { height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  primaryButtonText: { fontSize: 18, color: '#fff', fontWeight: '700' },
  secondaryButton: { height: 50, justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { fontSize: 18, fontWeight: '700' },
});