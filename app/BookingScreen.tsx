import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// --- Helper to generate dummy dates for the UI ---
const getUpcomingDays = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  let today = new Date();
  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push({
      fullDate: nextDate.toISOString(),
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : days[nextDate.getDay()],
      dateNum: nextDate.getDate(),
    });
  }
  return dates;
};

const timeSlots = [
  '09:00 AM', '10:30 AM', '12:00 PM', 
  '02:00 PM', '03:30 PM', '05:00 PM', 
  '06:30 PM', '08:00 PM'
];

export default function BookingScreen() {
  const router = useRouter();
  // In a real app, you would pass these via router.push({ pathname: '/booking', params: { title: 'Bathroom Cleaning', price: '315' } })
  const { title = 'Bathroom Cleaning', price = '315', image = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80' } = useLocalSearchParams();

  const [isInstant, setIsInstant] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(getUpcomingDays()[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const upcomingDays = getUpcomingDays();

  const handleInstantToggle = () => {
    setIsInstant(true);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string, date: string) => {
    setIsInstant(false);
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleProceedToPay = () => {
    if (!isInstant && (!selectedDate || !selectedTime)) {
      alert('Please select a date and time, or choose Instant Booking.');
      return;
    }
    
    // TODO: Integrate Payment Gateway (Razorpay, Stripe, etc.) here
    console.log('Proceeding to pay:', {
      service: title,
      amount: price,
      bookingType: isInstant ? 'Instant (10 mins)' : 'Scheduled',
      date: selectedDate,
      time: selectedTime,
    });
    
    // Example redirection to a success page after payment:
    // router.push('/success');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Slot</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Service Summary Card */}
        <View style={styles.summaryCard}>
          <Image source={{ uri: image as string }} style={styles.serviceImage} />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.serviceTitle}>{title}</Text>
            <Text style={styles.serviceDescription}>
              Professional deep cleaning ensuring a spotless, hygienic, and fresh-smelling environment.
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
              <MaterialIcons name="flash-on" size={28} color={isInstant ? "#fff" : "#0066FF"} />
            </View>
            <View style={styles.instantTextWrapper}>
              <Text style={[styles.instantTitle, isInstant && styles.textWhite]}>
                Instant Booking
              </Text>
              <Text style={[styles.instantSub, isInstant && styles.textWhite70]}>
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

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {upcomingDays.map((dateObj, index) => {
              const isSelected = selectedDate === dateObj.fullDate && !isInstant;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateCard, isSelected && styles.dateCardActive]}
                  onPress={() => {
                    setIsInstant(false);
                    setSelectedDate(dateObj.fullDate);
                  }}
                >
                  <Text style={[styles.dayText, isSelected && styles.textWhite]}>
                    {dateObj.dayName}
                  </Text>
                  <Text style={[styles.dateNumText, isSelected && styles.textWhite]}>
                    {dateObj.dateNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={[styles.section, { marginBottom: 100 }]}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => {
              const isSelected = selectedTime === time && !isInstant;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeSlot, isSelected && styles.timeSlotActive]}
                  onPress={() => handleTimeSelect(time, selectedDate || upcomingDays[0].fullDate)}
                >
                  <Text style={[styles.timeText, isSelected && styles.textWhite]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
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
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  container: { flex: 1 },
  
  summaryCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  serviceImage: { width: 80, height: 80, borderRadius: 12 },
  summaryTextContainer: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  serviceTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 6 },
  serviceDescription: { fontSize: 13, color: '#666', lineHeight: 18 },

  section: { paddingHorizontal: 16, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 12 },
  
  instantCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E5F0FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#B3D4FF' },
  instantCardActive: { backgroundColor: '#0066FF', borderColor: '#0066FF' },
  instantIconWrapper: { width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  instantTextWrapper: { flex: 1 },
  instantTitle: { fontSize: 16, fontWeight: 'bold', color: '#0066FF', marginBottom: 4 },
  instantSub: { fontSize: 13, color: '#4D8DF5' },
  textWhite: { color: '#fff' },
  textWhite70: { color: 'rgba(255,255,255,0.8)' },
  radioCircle: { height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: '#0066FF', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  radioInner: { height: 12, width: 12, borderRadius: 6, backgroundColor: '#0066FF' },

  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24, paddingHorizontal: 30 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  dividerText: { marginHorizontal: 10, fontSize: 12, fontWeight: 'bold', color: '#999', letterSpacing: 1 },

  dateScroll: { paddingBottom: 10 },
  dateCard: { width: 65, height: 80, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  dateCardActive: { backgroundColor: '#0066FF', borderColor: '#0066FF' },
  dayText: { fontSize: 13, color: '#666', marginBottom: 4 },
  dateNumText: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },

  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  timeSlot: { width: '31%', backgroundColor: '#fff', paddingVertical: 12, borderRadius: 10, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  timeSlotActive: { backgroundColor: '#0066FF', borderColor: '#0066FF' },
  timeText: { fontSize: 14, fontWeight: '500', color: '#333' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', padding: 20, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#E0E0E0', alignItems: 'center', justifyContent: 'space-between' },
  priceContainer: { flex: 1 },
  totalLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  payButton: { backgroundColor: '#0066FF', flexDirection: 'row', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
});