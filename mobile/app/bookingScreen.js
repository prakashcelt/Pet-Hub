import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker"; // Install if not present
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

  // Generate hourly slots from 10 AM to 10 PM
  const slots = Array.from({ length: 12 }, (_, i) => {
    const hour = 10 + i;
    return `${hour}:00`;
  });



  //   const bookAppointment = useClinicsStore(state => state.bookAppointment);

  const handleBook = async () => {
    try {
      await bookAppointment(selectedFacility, selectedTime);
      Alert.alert("Success", "Appointment booked!");
    } catch (e) {
      Alert.alert("Error", "Failed to book appointment.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Book Appointment</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Clinic: {facilityName}</Text>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Select Facility:</Text>
      {facilityArray.length === 0 ? (
        <Text style={{ color: "red", marginBottom: 20 }}>No facilities available for booking.</Text>
      ) : (
        <Picker
          selectedValue={selectedFacility}
          onValueChange={setSelectedFacility}
          style={{ marginBottom: 20 }}
        >
          {facilityArray.map(facility => (
            <Picker.Item key={facility.id} label={facility.name} value={facility.id} />
          ))}
        </Picker>
      )}

      <Text style={{ fontSize: 16, marginBottom: 5 }}>Select Time Slot:</Text>
      <Picker
        selectedValue={selectedTime}
        onValueChange={setSelectedTime}
        style={{ marginBottom: 20 }}
      >
        {slots.map(slot => (
          <Picker.Item key={slot} label={slot} value={slot} />
        ))}
      </Picker>

      <TouchableOpacity
        style={{ backgroundColor: "#ff9800", padding: 15, borderRadius: 8 }}
        onPress={handleBook}
        disabled={facilityArray.length === 0}
      >
        <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}