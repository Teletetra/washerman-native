import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { theme } from '@/src/theme/colors';

// 🔥 Marquee Row Component for Animated Images
const MarqueeRow = ({ images, reverse }: { images: any[], reverse?: boolean }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: reverse ? 300 : -300,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [reverse, translateX]);

  return (
    <View style={styles.marqueeContainer}>
      <Animated.View style={[styles.row, { transform: [{ translateX }] }]}>
        {[...images, ...images].map((img, index) => (
          <View key={index} style={styles.imagePlaceholder}>
            <Text style={{ fontSize: 30 }}>✨</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasReferral, setHasReferral] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Listen for keyboard to hide the images and prevent layout breaking
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onContinue = () => {
    if (phoneNumber.length !== 10) {
      alert('Please enter a valid phone number');
      return;
    }
    // Simple navigation, no Firebase calls
    router.replace('/location1');
  };

  const onSkip = () => {
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <View style={styles.innerContainer}>

            {/* Top Header Section */}
            <View style={styles.headerBackground}>
              <View style={styles.skipContainer}>
                <TouchableOpacity style={styles.skipButton} onPress={onSkip} activeOpacity={0.8}>
                  <Text style={styles.skipButtonText}>Skip login</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.logoText}>Washerman</Text>
              <Text style={styles.subtitleText}>
                Get professional{'\n'}house help in minutes!
              </Text>
            </View>

            {/* Animated Marquee Images */}
            {!isKeyboardVisible && (
              <View style={styles.marqueeWrapper}>
                <MarqueeRow images={[1, 2, 3]} />
                <MarqueeRow images={[4, 5, 6]} reverse />
              </View>
            )}

            {/* Form Section */}
            <View style={styles.formContainer}>
              <View>
                <Text style={styles.formTitle}>Log in or Sign up</Text>

                {/* Input Field */}
                <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
                  <Text style={styles.countryCode}>+91</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter mobile number"
                    placeholderTextColor={theme.textMuted}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={(t) => setPhoneNumber(t.replace(/[^0-9]/g, '').slice(0, 10))}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                  style={[
                    styles.continueButton,
                    phoneNumber.length === 10 ? styles.buttonActive : styles.buttonInactive,
                  ]}
                  onPress={onContinue}
                  activeOpacity={0.8}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                {/* Referral Checkbox */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setHasReferral(!hasReferral)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, hasReferral && styles.checkboxActive]}>
                    {hasReferral && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Have a referral code?</Text>
                </TouchableOpacity>
              </View>

              {/* Terms and Privacy Policy */}
              <View style={styles.footer}>
                <Text style={styles.termsText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> &{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </View>

          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.primary },
  container: { flex: 1, backgroundColor: theme.background },
  innerContainer: { flex: 1 },
  headerBackground: { backgroundColor: theme.primary, paddingTop: Platform.OS === 'android' ? 20 : 10, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },
  skipContainer: { width: '100%', alignItems: 'flex-end', marginBottom: 10 },
  skipButton: { backgroundColor: theme.primaryDark, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  skipButtonText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  logoText: { color: '#FFF', fontSize: 44, fontWeight: '900', marginBottom: 5, letterSpacing: -1 },
  subtitleText: { color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center', lineHeight: 28 },
  marqueeWrapper: { marginTop: 20, marginBottom: 10 },
  marqueeContainer: { overflow: 'hidden', marginBottom: 12 },
  row: { flexDirection: 'row' },
  imagePlaceholder: { height: 90, width: 90, borderRadius: 16, marginRight: 12, backgroundColor: '#F0F8FF', justifyContent: 'center', alignItems: 'center' },
  formContainer: { flex: 1, paddingHorizontal: 24, paddingTop: 15, paddingBottom: Platform.OS === 'ios' ? 10 : 20, justifyContent: 'space-between' },
  formTitle: { fontSize: 24, fontWeight: '800', color: theme.textDark, textAlign: 'center', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 16, height: 56, marginBottom: 16, backgroundColor: '#FFF' },
  inputFocused: { borderColor: theme.primary },
  countryCode: { fontSize: 16, fontWeight: '700', color: theme.textDark, marginRight: 12, borderRightWidth: 1.5, borderRightColor: theme.border, paddingRight: 12 },
  input: { flex: 1, fontSize: 16, color: theme.textDark, fontWeight: '600', height: '100%' },
  continueButton: { height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 5 },
  buttonActive: { backgroundColor: theme.primary },
  buttonInactive: { backgroundColor: theme.disabledBtn },
  continueButtonText: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: theme.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  checkboxActive: { backgroundColor: theme.primary },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 15, color: theme.textDark, fontWeight: '500' },
  footer: { alignItems: 'center', paddingBottom: 10 },
  termsText: { fontSize: 12, textAlign: 'center', color: theme.textMuted, lineHeight: 18 },
  termsLink: { fontWeight: '600', textDecorationLine: 'underline' },
});