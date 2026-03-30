import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from '@/src/theme/colors.ts'
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";

const FloatingLabelInput = ({ label, value, onChangeText, ...props }: any) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.textMuted}
        {...props}
      />
    </View>
  );
};

export default function UpdateProfile() {
  const router = useRouter();

  // Mock State
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [mobile, setMobile] = useState("8279791418");
  const [email, setEmail] = useState("Email");

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Header title="Profile details" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarGiantIcon}>👤</Text>
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <Text style={styles.editPencil}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formSection}>

            <InputField label="First Name" value={firstName} onChangeText={setFirstName} />
            <InputField label="Last Name" value="User" />
            <InputField label="Mobile" value="8279791418" keyboardType="phone-pad" />
          </View>
        </ScrollView>

        <View style={styles.bottomArea}>
          <Button title="Update profile" onPress={() => router.back()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.surface }, // Needs to be surface color for the header
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    backgroundColor: theme.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  backButton: { marginRight: 15, padding: 5 },
  backIcon: { color: theme.textDark, fontSize: 24, fontWeight: "600" },
  headerTitle: { color: theme.textDark, fontSize: 20, fontWeight: "700" },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  avatarSection: { alignItems: "center", marginVertical: 40 },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F0F4F8", // Very light greyish blue
    borderWidth: 4,
    borderColor: theme.textDark, // Matching the thick black outline in your image
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarGiantIcon: { fontSize: 80, color: theme.textMuted },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: theme.primaryLight,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.surface,
  },
  editPencil: { fontSize: 16 },
  formSection: { marginTop: 10 },

  // Custom Floating Input Styles
  inputWrapper: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 24,
    justifyContent: "center",
    backgroundColor: theme.surface,
    position: "relative",
  },
  inputLabel: {
    position: "absolute",
    top: -10, // Pulls the label exactly onto the border line
    left: 12,
    backgroundColor: theme.surface, // Masks the border line behind it
    paddingHorizontal: 6,
    fontSize: 13,
    color: theme.textDark,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    color: theme.textMuted, // Values look muted in your screenshot
    fontWeight: "500",
  },

  bottomArea: {
    backgroundColor: theme.surface,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  updateButton: {
    backgroundColor: theme.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonText: {
    color: theme.surface,
    fontSize: 18,
    fontWeight: "700",
  },
});
