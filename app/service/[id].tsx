import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const theme = {
    primary: '#1573FF',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    textDark: '#1E1E1E',
    border: '#E5E5EA',
};

export default function ServiceDetailsScreen() {
    const router = useRouter();

    const { id, title } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service Details</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>You selected:</Text>
                <Text style={styles.dynamicText}>{title}</Text>
                <Text style={styles.idText}>Service ID: {id}</Text>

                {/* <Text style={styles.placeholder}>
                    In a real app, you would use this ID ({id}) to fetch the full
                    service details (like description, what's included, and FAQs)
                    from your backend API!
                </Text> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.surface },
    container: { flex: 1, backgroundColor: theme.background, padding: 20, alignItems: 'center', justifyContent: 'center' },
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
    title: { fontSize: 18, color: '#8E8E93', marginBottom: 10 },
    dynamicText: { fontSize: 32, fontWeight: '800', color: theme.textDark, textAlign: 'center', marginBottom: 10 },
    idText: { fontSize: 16, color: theme.primary, fontWeight: '700', marginBottom: 30 },
    placeholder: { textAlign: 'center', color: '#8E8E93', lineHeight: 24, paddingHorizontal: 20 }
});