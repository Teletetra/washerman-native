// src/components/InputField.tsx
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../theme/colors';

interface InputFieldProps extends TextInputProps {
    label: string;
}

export default function InputField({ label, ...props }: InputFieldProps) {
    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={theme.textMuted}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        top: -10,
        left: 12,
        backgroundColor: theme.surface,
        paddingHorizontal: 6,
        fontSize: 13,
        color: theme.textDark,
        fontWeight: "500",
    },
    input: {
        fontSize: 16,
        color: theme.textDark,
        fontWeight: "500",
    },
});