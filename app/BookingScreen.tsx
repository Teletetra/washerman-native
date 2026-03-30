import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

// --- Formatting Helpers ---
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function BookingScreen() {
  const router = useRouter();
  const {
    title = "Bathroom Cleaning",
    price = "315",
    image = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
  } = useLocalSearchParams();

  // Booking States
  const [isInstant, setIsInstant] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hasPickedDate, setHasPickedDate] = useState(false);
  const [hasPickedTime, setHasPickedTime] = useState(false);

  // Picker States
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showPicker, setShowPicker] = useState(false);

  // --- Handlers ---
  const handleInstantToggle = () => {
    setIsInstant(true);
    setHasPickedDate(false);
    setHasPickedTime(false);
    setShowPicker(false);
  };

  const showMode = (currentMode: "date" | "time") => {
    setIsInstant(false);
    setMode(currentMode);
    setShowPicker(true);
  };

  const onPickerChange = (event: any, selectedDate?: Date) => {
    // Hide picker on Android after selection
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    // If user cancelled, do nothing
    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setDate(selectedDate);
      if (mode === "date") setHasPickedDate(true);
      if (mode === "time") setHasPickedTime(true);
      setIsInstant(false);
    }
  };

  const handleProceedToPay = () => {
    if (!isInstant && (!hasPickedDate || !hasPickedTime)) {
      alert("Please select both a date and time, or choose Instant Booking.");
      return;
    }

    console.log("Proceeding to pay:", {
      service: title,
      amount: price,
      bookingType: isInstant ? "Instant (10 mins)" : "Scheduled",
      scheduledDate: isInstant ? null : formatDate(date),
      scheduledTime: isInstant ? null : formatTime(date),
    });

    // router.push('/success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Slot</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Service Summary Card */}
        <View style={styles.summaryCard}>
          <Image
            source={{ uri: image as string }}
            style={styles.serviceImage}
          />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.serviceTitle}>{title}</Text>
            <Text style={styles.serviceDescription}>
              Professional deep cleaning ensuring a spotless, hygienic, and
              fresh-smelling environment.
            </Text>
          </View>
        </View>

        {/* Instant Booking Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need it urgently?</Text>
          <TouchableOpacity
            style={[styles.instantCard, isInstant && styles.instantCardActive]}
            activeOpacity={0.8}
            onPress={handleInstantToggle}
          >
            <View style={styles.instantIconWrapper}>
              <MaterialIcons
                name="flash-on"
                size={28}
                color={isInstant ? "#fff" : "#0066FF"}
              />
            </View>
            <View style={styles.instantTextWrapper}>
              <Text
                style={[styles.instantTitle, isInstant && styles.textWhite]}
              >
                Instant Booking
              </Text>
              <Text
                style={[styles.instantSub, isInstant && styles.textWhite70]}
              >
                Partner arrives in next 10-15 minutes
              </Text>
            </View>
            <View style={styles.radioCircle}>
              {isInstant && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR SCHEDULE FOR LATER</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Custom Date & Time Selection */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Pick a Date & Time</Text>

          <View style={styles.pickerContainer}>
            {/* Date Picker Button */}
            <TouchableOpacity
              style={[
                styles.pickerButton,
                hasPickedDate && !isInstant && styles.pickerButtonActive,
              ]}
              onPress={() => showMode("date")}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={hasPickedDate && !isInstant ? "#fff" : "#0066FF"}
              />
              <View style={styles.pickerTextContainer}>
                <Text
                  style={[
                    styles.pickerLabel,
                    hasPickedDate && !isInstant && styles.textWhite70,
                  ]}
                >
                  Date
                </Text>
                <Text
                  style={[
                    styles.pickerValue,
                    hasPickedDate && !isInstant && styles.textWhite,
                  ]}
                >
                  {hasPickedDate && !isInstant
                    ? formatDate(date)
                    : "Select Date"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Time Picker Button */}
            <TouchableOpacity
              style={[
                styles.pickerButton,
                hasPickedTime && !isInstant && styles.pickerButtonActive,
              ]}
              onPress={() => showMode("time")}
            >
              <Ionicons
                name="time-outline"
                size={24}
                color={hasPickedTime && !isInstant ? "#fff" : "#0066FF"}
              />
              <View style={styles.pickerTextContainer}>
                <Text
                  style={[
                    styles.pickerLabel,
                    hasPickedTime && !isInstant && styles.textWhite70,
                  ]}
                >
                  Time
                </Text>
                <Text
                  style={[
                    styles.pickerValue,
                    hasPickedTime && !isInstant && styles.textWhite,
                  ]}
                >
                  {hasPickedTime && !isInstant
                    ? formatTime(date)
                    : "Select Time"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Render the Native Picker */}
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onPickerChange}
              minimumDate={new Date()} // Prevents selecting past dates
            />
          )}

          {/* iOS requires a close button for the spinner display */}
          {showPicker && Platform.OS === "ios" && (
            <TouchableOpacity
              style={styles.iosDoneButton}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.iosDoneText}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Bottom Payment Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>₹{price}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleProceedToPay}>
          <Text style={styles.payButtonText}>Proceed to Pay</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  container: { flex: 1 },

  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceImage: { width: 80, height: 80, borderRadius: 12 },
  summaryTextContainer: { flex: 1, marginLeft: 16, justifyContent: "center" },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 6,
  },
  serviceDescription: { fontSize: 13, color: "#666", lineHeight: 18 },

  section: { paddingHorizontal: 16, marginTop: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },

  instantCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5F0FF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#B3D4FF",
  },
  instantCardActive: { backgroundColor: "#0066FF", borderColor: "#0066FF" },
  instantIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  instantTextWrapper: { flex: 1 },
  instantTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066FF",
    marginBottom: 4,
  },
  instantSub: { fontSize: 13, color: "#4D8DF5" },
  textWhite: { color: "#fff" },
  textWhite70: { color: "rgba(255,255,255,0.8)" },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#0066FF",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 30,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    letterSpacing: 1,
  },

  // New Custom Picker Styles
  pickerContainer: { flexDirection: "row", justifyContent: "space-between" },
  pickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  pickerButtonActive: { backgroundColor: "#0066FF", borderColor: "#0066FF" },
  pickerTextContainer: { marginLeft: 12 },
  pickerLabel: { fontSize: 12, color: "#666", marginBottom: 4 },
  pickerValue: { fontSize: 14, fontWeight: "bold", color: "#1A1A1A" },

  iosDoneButton: {
    backgroundColor: "#E5F0FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  iosDoneText: { color: "#0066FF", fontWeight: "bold", fontSize: 16 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: { flex: 1 },
  totalLabel: { fontSize: 12, color: "#666", marginBottom: 4 },
  totalPrice: { fontSize: 22, fontWeight: "bold", color: "#1A1A1A" },
  payButton: {
    backgroundColor: "#0066FF",
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
