// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

export default function Button({ title, onPress, disabled = false, variant = 'primary' }: ButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primaryBtn : styles.secondaryBtn,
                disabled && styles.disabledBtn
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <Text style={[
                styles.text,
                isPrimary ? styles.primaryText : styles.secondaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    primaryBtn: { backgroundColor: theme.primary },
    secondaryBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary },
    disabledBtn: { backgroundColor: theme.disabledBtn, borderColor: theme.disabledBtn },
    text: { fontSize: 18, fontWeight: '700' },
    primaryText: { color: theme.surface },
    secondaryText: { color: theme.primary },
});