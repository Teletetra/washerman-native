import { useRouter } from "expo-router"; // <-- Added router import
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from '@/src/theme/colors.ts';

// ... (Keep your servicesData array here) ...
const servicesData = [
  { id: "1", title: "Toilet\nCleaning", price: 15, oldPrice: 150, rating: "4.0", reviews: "4.2k", icon: "🚽" },
  { id: "2", title: "Kitchen\nCleaning", price: 79, oldPrice: 199, rating: "4.5", reviews: "1.1k", icon: "🍽️" },
  { id: "3", title: "Deep\nCleaning", price: 80, oldPrice: 800, rating: "5.0", reviews: "800", icon: "🧼" },
  { id: "4", title: "Full Home\nCleaning", price: 150, oldPrice: 300, rating: "4.5", reviews: "3.0k", icon: "🏠" },
  { id: "5", title: "Carpet\nCleaning", price: 12, oldPrice: 120, rating: "4.0", reviews: "1.2k", icon: "🛋️" },
  { id: "6", title: "Sofa\nCleaning", price: 47, oldPrice: 156, rating: "4.6", reviews: "1.56k", icon: "🛋️" },
  { id: "7", title: "Electronic\nItem Cleaning", price: 24, oldPrice: 160, rating: "4.1", reviews: "1.6k", icon: "💻" },
  { id: "8", title: "Bathroom\nCleaning", price: 315, oldPrice: 700, rating: "4.0", reviews: "7.0k", icon: "🛁" },
  { id: "9", title: "Floor\nScrubbing", price: 175, oldPrice: 500, rating: "4.7", reviews: "500", icon: "🧹" },
  { id: "10", title: "Glass\nCleaning", price: 30, oldPrice: 85, rating: "4.3", reviews: "850", icon: "🪟" },
  { id: "11", title: "Utensils\nCleaning", price: 30, oldPrice: 85, rating: "4.0", reviews: "850", icon: "🍴" },
  { id: "12", title: "Dusting &\nWiping", price: 38, oldPrice: 110, rating: "4.2", reviews: "1.1k", icon: "🧹" },
  { id: "13", title: "Swiping &\nMopping", price: 70, oldPrice: 140, rating: "4.5", reviews: "1.4k", icon: "🧹" },
  { id: "14", title: "Cloth\nLaundry", price: 250, oldPrice: 500, rating: "4.8", reviews: "5.0k", icon: "🧺" },
  { id: "15", title: "Cloth Dry\nCleaning", price: 250, oldPrice: 500, rating: "4.8", reviews: "5.0k", icon: "🧺" },
  { id: "16", title: "Cloth\nIroning", price: 250, oldPrice: 500, rating: "4.8", reviews: "5.0k", icon: "🧺" },
];
export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.locationTitle}>NPX Tower ∨</Text>
            <Text style={styles.locationSubtitle} numberOfLines={1}>
              NPX Tower, 102, Noida-Greater Noid...
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.earnButton}
              onPress={() => router.push('/EarnRefer')}
            >
              <Text style={styles.earnIcon}>🪙</Text>
              <View>
                <Text style={styles.earnTextSmall}>Earn</Text>
                <Text style={styles.earnTextBold}>₹100</Text>
              </View>
            </TouchableOpacity>

            {/* Profile Button Connected Here */}
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitleLight}>WE ARE</Text>
          <Text style={styles.heroTitleBold}>
            COMING <Text style={{ color: theme.primary }}>SOON</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            We&apos;re currently live in select areas and expanding quickly. Get
            notified when we are near you!
          </Text>
          <TouchableOpacity style={styles.notifyButton} activeOpacity={0.8}>
            <Text style={styles.notifyIcon}>💬</Text>
            <Text style={styles.notifyText}>Notify me!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Services we offer</Text>
          <View style={styles.gridContainer}>
            {servicesData.map((item) => (
              < TouchableOpacity
                key={item.id}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => router.push({
                  pathname: '/service/[id]',
                  params: { id: item.id, title: item.title.replace('\n', ' ') }
                })}
              >
                <View style={styles.cardImageContainer}>
                  <View style={styles.ratingPill}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {item.rating} <Text style={{ color: theme.textMuted }}>({item.reviews})</Text>
                    </Text>
                  </View>
                  <Text style={styles.cardMockIcon}>{item.icon}</Text>
                </View>
                {/* Details */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{item.price}</Text>
                    <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

// ... (Keep your Dashboard styles unchanged, but ensure theme is updated to Light Blue above) ...
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.primary },
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    backgroundColor: theme.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 20,
  },
  headerLeft: { flex: 1 },
  locationTitle: { color: theme.surface, fontSize: 20, fontWeight: "800" },
  locationSubtitle: { color: theme.surface, fontSize: 13, marginTop: 4, opacity: 0.9 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  earnButton: {
    flexDirection: "row",
    backgroundColor: theme.primaryDark,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    marginRight: 10,
  },
  earnIcon: { marginRight: 4, fontSize: 16 },
  earnTextSmall: { color: theme.surface, fontSize: 10, lineHeight: 12 },
  earnTextBold: { color: theme.surface, fontSize: 12, fontWeight: "700", lineHeight: 14 },
  profileButton: {
    width: 36,
    height: 36,
    backgroundColor: theme.primaryDark,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: { fontSize: 16, color: theme.surface },
  heroSection: { alignItems: "center", paddingHorizontal: 30, paddingVertical: 40, backgroundColor: theme.surface },
  heroTitleLight: { fontSize: 28, fontWeight: "300", color: theme.textMuted },
  heroTitleBold: { fontSize: 32, fontWeight: "800", color: theme.textDark },
  heroSubtitle: { textAlign: "center", fontSize: 14, color: theme.textMuted, marginTop: 12, lineHeight: 20 },
  notifyButton: { flexDirection: "row", backgroundColor: theme.success, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, marginTop: 20, alignItems: "center" },
  notifyIcon: { marginRight: 8, fontSize: 18 },
  notifyText: { color: theme.surface, fontWeight: "700", fontSize: 16 },
  changeLocationText: { color: theme.primary, fontWeight: "700", marginTop: 16, textDecorationLine: "underline" },
  servicesSection: { paddingHorizontal: 20, paddingVertical: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "800", color: theme.textDark, marginBottom: 16, textAlign: "center" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceCard: { width: "48%", backgroundColor: theme.surface, borderRadius: 16, marginBottom: 16, overflow: "hidden", borderWidth: 1, borderColor: theme.border },
  cardImageContainer: { height: 120, backgroundColor: theme.primaryLight, justifyContent: "center", alignItems: "center", position: "relative" },
  ratingPill: { position: "absolute", top: 8, left: 8, backgroundColor: theme.surface, flexDirection: "row", alignItems: "center", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, zIndex: 10 },
  starIcon: { fontSize: 10, marginRight: 4 },
  ratingText: { fontSize: 10, fontWeight: "600", color: theme.textDark },
  cardMockIcon: { fontSize: 50 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: "700", color: theme.textDark, lineHeight: 18, marginBottom: 8 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  currentPrice: { fontSize: 16, fontWeight: "800", color: theme.textDark, marginRight: 6 },
  oldPrice: { fontSize: 12, color: theme.textMuted, textDecorationLine: "line-through" },
});