import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import BackHeader from './components/BackHeader';
// import useClinicsStore from "../zustand/clinics";

export default function BookingScreen() {
  const route = useRoute();
  const { facilitiesJson = '[]', facilityName = "Unknown Clinic" } = route.params || {};
  
  // Parse the JSON string back into an array
  let facilityArray = [];
  try {
    facilityArray = JSON.parse(facilitiesJson);
  } catch (err) {
    console.log("Error parsing facilities JSON:", err);
  }
  
  const [selectedFacility, setSelectedFacility] = useState(facilityArray.length > 0 ? facilityArray[0].id : "");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [facilityDropdownOpen, setFacilityDropdownOpen] = useState(false);

  // Generate hourly slots from 10 AM to 10 PM
  const slots = Array.from({ length: 12 }, (_, i) => {
    const hour = 10 + i;
    return `${hour}:00`;
  });

  const insets = useSafeAreaInsets();



  //   const bookAppointment = useClinicsStore(state => state.bookAppointment);

  const handleBook = () => {
    const selectedFacilityName = facilityArray.find(f => f.id === selectedFacility)?.name || facilityName || 'N/A';
    console.log('Booking -> facilityId:', selectedFacility, 'facilityName:', selectedFacilityName, 'time:', selectedTime);
    Alert.alert('Booking', `Facility: ${selectedFacilityName}\nTime: ${selectedTime}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right', 'bottom']}>
      <BackHeader title="Book Appointment" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: insets.bottom || 20,
          paddingHorizontal: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 20,fontWeight:"600",textAlign:"center", marginBottom: 18, color: '#111' }}>{facilityName}</Text>

        <Text style={styles.label}>Select Facility</Text>
        {facilityArray.length === 0 ? (
          <Text style={styles.emptyText}>No facilities available for booking.</Text>
        ) : (
          <View style={{ marginBottom: 12 }}>
            <TouchableOpacity
              style={styles.dropdownToggle}
              onPress={() => setFacilityDropdownOpen(v => !v)}
              activeOpacity={0.85}
            >
              <Text style={styles.dropdownToggleText} numberOfLines={1}>
                {facilityArray.find(f => f.id === selectedFacility)?.name || 'Select a facility'}
              </Text>
              <Text style={styles.dropdownChevron}>{facilityDropdownOpen ? '▴' : '▾'}</Text>
            </TouchableOpacity>

            {facilityDropdownOpen && (
              <View style={styles.dropdownListContainer}>
                <ScrollView style={{ maxHeight: 200 }}>
                  {facilityArray.map((f) => (
                    <TouchableOpacity
                      key={f.id}
                      style={styles.dropdownItem}
                      onPress={() => { setSelectedFacility(f.id); setFacilityDropdownOpen(false); }}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.dropdownItemText, selectedFacility === f.id && styles.dropdownItemTextSelected]} numberOfLines={1}>{f.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        <Text style={[styles.label, { marginTop: 8 }]}>Select Time Slot</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>
          {slots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeChip, selectedTime === slot && styles.timeChipSelected]}
              onPress={() => setSelectedTime(slot)}
              activeOpacity={0.85}
            >
              <Text style={[styles.timeChipText, selectedTime === slot && styles.timeChipTextSelected]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.button, facilityArray.length === 0 && styles.buttonDisabled]}
          onPress={handleBook}
          disabled={facilityArray.length === 0}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
    fontFamily: 'Inter_700Bold',
  },
  label: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  emptyText: {
    color: '#ef4444',
    marginBottom: 20,
  },
  facilitiesList: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12,
  },
  facilityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e6e9ef',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 1,
    marginBottom: 8,
  },
  facilityCardSelected: {
    borderColor: '#ff7a18',
    backgroundColor: '#fff7f0',
  },
  facilityCardText: {
    fontSize: 16,
    color: '#0f172a',
    fontFamily: 'Inter_600SemiBold',
  },
  facilityCardTextSelected: {
    color: '#b44a00',
  },
  timeChip: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e6e9ef',
  },
  timeChipSelected: {
    backgroundColor: '#ff7a18',
    borderColor: '#ff7a18',
  },
  timeChipText: {
    color: '#0f172a',
    fontFamily: 'Inter_600SemiBold',
  },
  timeChipTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff7a18',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    backgroundColor: '#f3f4f6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e6e9ef',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 1,
  },
  dropdownToggleText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  dropdownChevron: {
    fontSize: 16,
    color: '#6b7280',
  },
  dropdownListContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e6e9ef',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#0f172a',
  },
  dropdownItemTextSelected: {
    color: '#b44a00',
    fontWeight: '700',
  },
});