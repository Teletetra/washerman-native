import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { theme } from '@/src/theme/colors';

export default function BookingsScreen() {
  const [activeMainTab, setActiveMainTab] = useState<"upcoming" | "past">(
    "upcoming",
  );
  const [activeSubTab, setActiveSubTab] = useState<"one-time" | "recurring">(
    "one-time",
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Your bookings</Text>
        </View>

        {/* Main Tabs */}
        <View style={styles.mainTabsContainer}>
          <TouchableOpacity
            style={[
              styles.mainTab,
              activeMainTab === "upcoming" && {
                borderBottomColor: theme.primary,
              },
            ]}
            onPress={() => setActiveMainTab("upcoming")}
          >
            <Text
              style={[
                styles.mainTabText,
                activeMainTab === "upcoming"
                  ? { color: theme.textDark }
                  : { color: theme.textMuted },
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.mainTab,
              activeMainTab === "past" && { borderBottomColor: theme.primary },
            ]}
            onPress={() => setActiveMainTab("past")}
          >
            <Text
              style={[
                styles.mainTabText,
                activeMainTab === "past"
                  ? { color: theme.textDark }
                  : { color: theme.textMuted },
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sub Tabs Toggle */}
        <View style={styles.subTabsWrapper}>
          <View style={styles.subTabsContainer}>
            <TouchableOpacity
              style={[
                styles.subTab,
                activeSubTab === "one-time" && {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={() => setActiveSubTab("one-time")}
            >
              <Text
                style={[
                  styles.subTabText,
                  activeSubTab === "one-time"
                    ? { color: theme.surface }
                    : { color: theme.textDark },
                ]}
              >
                One-time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.subTab,
                activeSubTab === "recurring" && {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={() => setActiveSubTab("recurring")}
            >
              <Text
                style={[
                  styles.subTabText,
                  activeSubTab === "recurring"
                    ? { color: theme.surface }
                    : { color: theme.textDark },
                ]}
              >
                Recurring
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyStateContainer}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>📅</Text>
          <Text style={styles.emptyStateText}>No {activeMainTab} bookings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.background },
  container: { flex: 1, backgroundColor: theme.background },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  pageTitle: { fontSize: 24, fontWeight: "800", color: theme.textDark },
  mainTabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    marginBottom: 20,
  },
  mainTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  mainTabText: { fontSize: 16, fontWeight: "700" },
  subTabsWrapper: { paddingHorizontal: 20, marginBottom: 30 },
  subTabsContainer: {
    flexDirection: "row",
    backgroundColor: theme.surface,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: "hidden",
  },
  subTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 30,
  },
  subTabText: { fontSize: 15, fontWeight: "600" },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  emptyStateText: { fontSize: 18, fontWeight: "600", color: theme.textDark },
});
