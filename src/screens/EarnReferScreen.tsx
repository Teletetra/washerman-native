import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const theme = {
    primary: '#1573FF',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    textDark: '#1E1E1E',
    textMuted: '#8E8E93',
    border: '#E5E5EA',
    success: '#34C759',
};

export default function EarnReferScreen() {
    const router = useRouter();
    const referralCode = "VXOWDW";

    const handleCopyCode = () => {
        // In a real app, use expo-clipboard here
        Alert.alert("Copied!", `Referral code ${referralCode} copied to clipboard.`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Refer & earn</Text>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>

                {/* Main Reward Card */}
                <View style={styles.rewardCard}>
                    {/* Illustration Placeholder */}
                    <View style={styles.illustrationContainer}>
                        <Text style={styles.giantIcon}>🙌</Text>
                    </View>

                    <Text style={styles.cardSubtitle}>Refer a friend to Washerman</Text>
                    <Text style={styles.rewardText}>Get ₹100</Text>
                    <Text style={styles.termsText}>
                        Your friend gets flat ₹50 off on{'\n'}their first order on Washerman.
                    </Text>

                    {/* Code Box */}
                    <TouchableOpacity style={styles.codeBox} onPress={handleCopyCode} activeOpacity={0.7}>
                        <Text style={styles.codeText}>{referralCode}</Text>
                        <Text style={styles.copyIcon}>📋</Text>
                    </TouchableOpacity>
                </View>

                {/* How It Works Section */}
                <View style={styles.howItWorksCard}>
                    <Text style={styles.sectionTitle}>How it works</Text>

                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
                        <Text style={styles.stepText}>Share the link with your friend</Text>
                    </View>

                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}><Text style={styles.stepNumber}>2</Text></View>
                        <Text style={styles.stepText}>Your friend signs up on Washerman</Text>
                    </View>

                    <View style={styles.stepContainer}>
                        <View style={styles.stepCircle}><Text style={styles.stepNumber}>3</Text></View>
                        <Text style={styles.stepText}>You both get rewards after their first booking</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Fixed Bottom Action Area */}
            <View style={styles.bottomArea}>
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                    <Text style={styles.primaryButtonText}>Share invite link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6}>
                    <Text style={styles.secondaryButtonText}>Find friends to refer</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.surface },
    container: { flex: 1, backgroundColor: theme.background, paddingHorizontal: 16, paddingTop: 16 },

    // Header
    header: {
        backgroundColor: theme.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? 20 : 10,
        paddingBottom: 15,
    },
    backButton: { marginRight: 15, padding: 5 },
    backIcon: { fontSize: 24, fontWeight: '600', color: theme.textDark },
    headerTitle: { fontSize: 20, fontWeight: '700', color: theme.textDark },

    // Main Reward Card
    rewardCard: {
        backgroundColor: theme.surface,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        // Soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    illustrationContainer: {
        width: 140,
        height: 140,
        backgroundColor: '#E8F5E9', // Light green hint behind hands
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    giantIcon: { fontSize: 70 },
    cardSubtitle: { fontSize: 16, color: theme.textDark, fontWeight: '600', marginBottom: 8 },
    rewardText: { fontSize: 42, color: theme.success, fontWeight: '900', marginBottom: 12, letterSpacing: -1 },
    termsText: { fontSize: 14, color: theme.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.border,
    },
    codeText: { fontSize: 18, fontWeight: '700', color: theme.textDark, letterSpacing: 2, marginRight: 12 },
    copyIcon: { fontSize: 18 },

    // How It Works Card
    howItWorksCard: {
        backgroundColor: theme.surface,
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.textDark, marginBottom: 20 },
    stepContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    stepCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    stepNumber: { fontSize: 16, fontWeight: '700', color: theme.textDark },
    stepText: { flex: 1, fontSize: 15, color: theme.textDark, fontWeight: '500', lineHeight: 22 },

    // Bottom Area Fixed
    bottomArea: {
        backgroundColor: theme.surface,
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        borderTopWidth: 1,
        borderTopColor: theme.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    primaryButton: {
        backgroundColor: theme.primary,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryButtonText: { color: theme.surface, fontSize: 18, fontWeight: '700' },
    secondaryButton: { height: 40, justifyContent: 'center', alignItems: 'center' },
    secondaryButtonText: { color: theme.primary, fontSize: 16, fontWeight: '700' },
});