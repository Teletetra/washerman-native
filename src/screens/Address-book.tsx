import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const theme = {
    primary: '#1573FF',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    textDark: '#1E1E1E',
    border: '#E5E5EA',
};

export default function AddressBookScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Standard Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Address book</Text>
            </View>

            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.placeholderText}>Your saved addresses will appear here.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.surface },
    container: { flex: 1, backgroundColor: theme.background },
    header: {
        backgroundColor: theme.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    backButton: { marginRight: 15, padding: 5 },
    backIcon: { fontSize: 24, fontWeight: '600', color: theme.textDark },
    headerTitle: { fontSize: 20, fontWeight: '700', color: theme.textDark },
    content: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    placeholderText: {
        fontSize: 16,
        color: '#8E8E93',
    }
});