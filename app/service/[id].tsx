import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// --- CENTRAL DATA STORE FOR ALL SERVICES ---
// You can change all your data for every service right here.
const allServicesData: Record<string, any> = {
  "1": {
    title: "Toilet Cleaning",
    price: 15,
    originalPrice: 150,
    rating: 4.0,
    ratingCount: "4.2k",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    includes: [
      "Inside bowl deep clean",
      "Rim and exterior wipe",
      "Floor immediate area sweep",
    ],
    excludes: ["Full bathroom wash", "Drain unclogging"],
    steps: [
      {
        id: 1,
        title: "Scrubbing",
        description: "Deep scrub of the bowl",
        icon: "toilet",
      },
    ],
  },
  "2": {
    title: "Kitchen Cleaning",
    price: 79,
    originalPrice: 199,
    rating: 4.5,
    ratingCount: "1.1k",
    heroImage:
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80",
    includes: ["Slab and sink wash", "Cabinet exterior wipe", "Floor mopping"],
    excludes: ["Inside fridge cleaning", "Chimney deep clean"],
    steps: [
      {
        id: 1,
        title: "Degreasing",
        description: "Removing stains from counters",
        icon: "spray-bottle",
      },
    ],
  },
  "3": {
    title: "Deep Cleaning",
    price: 80,
    originalPrice: 800,
    rating: 5.0,
    ratingCount: "800",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: [
      "Every corner dusting",
      "Intensive floor scrubbing",
      "Fixture polishing",
    ],
    excludes: ["Exterior window washing", "Pest control"],
    steps: [
      {
        id: 1,
        title: "Intensive Scrub",
        description: "Full property wash",
        icon: "broom",
      },
    ],
  },
  // ... Note: For brevity I kept 4-7 minimal, just copy the structure above to fill them out!
  "4": {
    title: "Full Home Cleaning",
    price: 150,
    originalPrice: 300,
    rating: 4.5,
    ratingCount: "3.0k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["All rooms"],
    excludes: ["Pest control"],
    steps: [],
  },
  "5": {
    title: "Carpet Cleaning",
    price: 12,
    originalPrice: 120,
    rating: 4.0,
    ratingCount: "1.2k",
    heroImage:
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80",
    includes: ["Vacuuming"],
    excludes: ["Tear repair"],
    steps: [],
  },
  "6": {
    title: "Sofa Cleaning",
    price: 47,
    originalPrice: 156,
    rating: 4.6,
    ratingCount: "1.56k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Shampooing"],
    excludes: ["Wood polish"],
    steps: [],
  },
  "7": {
    title: "Electronic Item Cleaning",
    price: 24,
    originalPrice: 160,
    rating: 4.1,
    ratingCount: "1.6k",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    includes: ["Dusting"],
    excludes: ["Internal repair"],
    steps: [],
  },

  "8": {
    title: "Bathroom Cleaning",
    price: 315,
    originalPrice: 700,
    rating: 4.0,
    ratingCount: "7.0k",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    includes: [
      "Cleaning of toilet bowl (inside and rim)",
      "Cleaning of washbasin and faucet",
      "Wiping of bathroom tiles and visible surfaces",
      "Sweeping and mopping of bathroom floor",
    ],
    excludes: [
      "Deep cleaning such as tile grout scrubbing",
      "Removal of heavy mold or hard water stains",
      "Cleaning of mirrors or storage interiors",
    ],
    steps: [
      {
        id: 1,
        title: "Toilet cleaning",
        description: "The toilet bowl is cleaned initially.",
        icon: "toilet",
      },
      {
        id: 2,
        title: "Surface cleaning",
        description: "All surfaces are wiped down.",
        icon: "spray-bottle",
      },
    ],
  },

  // Fill in 9 through 16 using the same pattern below
  "9": {
    title: "Floor Scrubbing",
    price: 175,
    originalPrice: 500,
    rating: 4.7,
    ratingCount: "500",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Machine scrub"],
    excludes: ["Polishing"],
    steps: [],
  },
  "10": {
    title: "Glass Cleaning",
    price: 30,
    originalPrice: 85,
    rating: 4.3,
    ratingCount: "850",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Inside glass"],
    excludes: ["Exterior high-rise"],
    steps: [],
  },
  "11": {
    title: "Utensils Cleaning",
    price: 30,
    originalPrice: 85,
    rating: 4.0,
    ratingCount: "850",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Sink load wash"],
    excludes: ["Burnt pan restoration"],
    steps: [],
  },
  "12": {
    title: "Dusting & Wiping",
    price: 38,
    originalPrice: 110,
    rating: 4.2,
    ratingCount: "1.1k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Surface wipe"],
    excludes: ["Deep stain removal"],
    steps: [],
  },
  "13": {
    title: "Swiping & Mopping",
    price: 70,
    originalPrice: 140,
    rating: 4.5,
    ratingCount: "1.4k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Floor clean"],
    excludes: ["Grout clean"],
    steps: [],
  },
  "14": {
    title: "Cloth Laundry",
    price: 250,
    originalPrice: 500,
    rating: 4.8,
    ratingCount: "5.0k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Machine wash"],
    excludes: ["Dry clean only fabrics"],
    steps: [],
  },
  "15": {
    title: "Cloth Dry Cleaning",
    price: 250,
    originalPrice: 500,
    rating: 4.8,
    ratingCount: "5.0k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Chemical clean"],
    excludes: ["Leather goods"],
    steps: [],
  },
  "16": {
    title: "Cloth Ironing",
    price: 250,
    originalPrice: 500,
    rating: 4.8,
    ratingCount: "5.0k",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    includes: ["Steam press"],
    excludes: ["Washing"],
    steps: [],
  },
};

// Global FAQs fallback
const defaultFaqs = [
  "Can I book a recurring service?",
  "How can I trust your service?",
  "Do I need to provide all the cleaning equipment?",
];

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Gets the ID from the URL/Route

  // Retrieve the specific service data based on the ID
  // If the ID isn't found in our object, we fall back to a default state (or you could show a 404)
  const serviceData = allServicesData[id as string] || {
    title: "Service Not Found",
    price: 0,
    originalPrice: 0,
    rating: 0,
    ratingCount: "0",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
    includes: [],
    excludes: [],
    steps: [],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* --- Hero Section --- */}
        <ImageBackground
          source={{ uri: serviceData.heroImage }}
          style={styles.heroBackground}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-social" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>
                Fresh surfaces.{"\n"}Flawless finish.
              </Text>
              <Text style={styles.heroSubtitle}>
                From stains to spotless,{"\n"}every surface covered.
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* --- Main Content Area --- */}
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.serviceTitle}>{serviceData.title}</Text>
            <TouchableOpacity
              style={styles.addBookingButton}
              onPress={() =>
                router.push({
                  pathname: "/BookingScreen",
                  params: {
                    title: serviceData.title,
                    price: String(serviceData.price),
                    image: serviceData.heroImage,
                  },
                })
              }
            >
              <Text style={styles.addBookingText}>+ Add booking</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>₹{serviceData.price}</Text>
            {serviceData.originalPrice > 0 && (
              <Text style={styles.originalPrice}>
                ₹{serviceData.originalPrice}
              </Text>
            )}
          </View>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {serviceData.rating} ({serviceData.ratingCount} ratings)
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Includes */}
          {serviceData.includes.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Includes</Text>
              {serviceData.includes.map((item: string, index: number) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#0066FF" />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
            </>
          )}

          {/* Excludes */}
          {serviceData.excludes.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
                Does not include
              </Text>
              {serviceData.excludes.map((item: string, index: number) => (
                <View key={index} style={styles.listItem}>
                  <Ionicons name="close-circle" size={20} color="#FF4D4D" />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              ))}
              <View style={styles.divider} />
            </>
          )}

          {/* Steps */}
          {serviceData.steps.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>How it's done?</Text>
              {serviceData.steps.map((step: any) => (
                <View key={step.id} style={styles.stepContainer}>
                  <View style={styles.stepIconContainer}>
                    <MaterialCommunityIcons
                      name={step.icon as any}
                      size={28}
                      color="#0066FF"
                    />
                  </View>
                  <View style={styles.stepTextContainer}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepDescription}>
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.divider} />
            </>
          )}

          {/* FAQs */}
          <Text style={styles.sectionTitle}>FAQs</Text>
          {defaultFaqs.map((faq, index) => (
            <TouchableOpacity key={index} style={styles.faqContainer}>
              <Text style={styles.faqText}>{faq}</Text>
              <Ionicons name="add" size={24} color="#333" />
            </TouchableOpacity>
          ))}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Keep the same styles as before
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  heroBackground: { width: "100%", height: 300 },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 102, 255, 0.7)",
    padding: 20,
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  heroTextContainer: { marginBottom: 20 },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSubtitle: { color: "#E0EFFF", fontSize: 14, lineHeight: 20 },
  contentContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceTitle: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A", flex: 1 },
  addBookingButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addBookingText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  currentPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  ratingText: { fontSize: 14, color: "#666", marginLeft: 6 },
  divider: { height: 1, backgroundColor: "#EEEEEE", marginVertical: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingRight: 20,
  },
  listItemText: { fontSize: 14, color: "#333", marginLeft: 12, lineHeight: 20 },
  stepContainer: { flexDirection: "row", marginBottom: 24 },
  stepIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#E5F0FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepTextContainer: { flex: 1, justifyContent: "center" },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  stepDescription: { fontSize: 13, color: "#666", lineHeight: 18 },
  faqContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  faqText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500",
    flex: 1,
    paddingRight: 10,
  },
});
