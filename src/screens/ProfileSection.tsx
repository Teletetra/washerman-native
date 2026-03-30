import { useRouter } from "expo-router";
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


const menuItems = [
  { id: 1, title: "Your bookings", icon: "📅" },
  { id: 2, title: "Address book", icon: "📖" },
  { id: 3, title: "Refer & Earn", icon: "🔗", badge: "Earn upto ₹5000" },
  { id: 4, title: "About us", icon: "ℹ️" },
  { id: 5, title: "Terms & conditions", icon: "📄" },
  { id: 6, title: "Privacy policy", icon: "🔒" },
  { id: 7, title: "Help & support", icon: "🎧" },
  { id: 8, title: "Request account deletion", icon: "🗑️" },
  { id: 9, title: "Log out", icon: "🚪" },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.header}>
          <View style={styles.headerNav}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Washerman User</Text>
              <Text style={styles.userPhone}>+91 8279791418</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("/updateProfile")} // <-- Connects to Update Profile
              >
                <Text style={styles.editText}>Edit profile ›</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>

                <View style={styles.menuItemRight}>
                  {item.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>🪙 {item.badge}</Text>
                    </View>
                  )}
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.primary },
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 40,
  },
  headerNav: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  backButton: { marginRight: 15, padding: 5 },
  backIcon: { color: theme.surface, fontSize: 24, fontWeight: "600" },
  headerTitle: { color: theme.surface, fontSize: 20, fontWeight: "700" },
  profileInfoContainer: { flexDirection: "row", alignItems: "center" },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#C3D6EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  avatarIcon: { fontSize: 40, opacity: 0.5 },
  userInfo: { flex: 1 },
  userName: {
    color: theme.surface,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  userPhone: {
    color: theme.surface,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 8,
  },
  editButton: { flexDirection: "row", alignItems: "center" },
  editText: { color: "#AEE5FF", fontSize: 14, fontWeight: "700" },
  menuContainer: { paddingHorizontal: 20, marginTop: -20, paddingBottom: 40 },
  menuCard: {
    backgroundColor: theme.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuIcon: { fontSize: 20, marginRight: 16, opacity: 0.8 },
  menuTitle: { fontSize: 16, color: theme.textDark, fontWeight: "500" },
  menuItemRight: { flexDirection: "row", alignItems: "center" },
  badge: {
    backgroundColor: "#FFF5E5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  badgeText: { color: theme.warning, fontSize: 12, fontWeight: "700" },
  chevron: { fontSize: 24, color: theme.textMuted, marginTop: -2 },
});
