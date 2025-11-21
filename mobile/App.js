import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const initialForm = {
  clinicName: '',
  email: '',
  address: '',
  description: '',
};

export default function App() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    Alert.alert('Application received', 'We will review your clinic shortly.');
    setForm(initialForm);
  };

  return (
    <LinearGradient colors={['#fff7ec', '#ffe4c4']} style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <LinearGradient colors={['#ff9933', '#ff7a18']} style={styles.visualPanel}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }}
                resizeMode="contain"
                style={styles.icon}
              />
              <Text style={styles.panelTitle}>Welcome to Pet Hub Admin</Text>
              <Text style={styles.panelSubtitle}>
                Manage your clinic, events, and bookings in one place.
              </Text>
            </LinearGradient>
            <View style={styles.formSection}>
              <Text style={styles.formTitle}>Clinic Registration Form</Text>
              <TextInput
                style={styles.input}
                placeholder="Clinic Name"
                placeholderTextColor="#a0a0a0"
                value={form.clinicName}
                onChangeText={(value) => handleChange('clinicName', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#a0a0a0"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(value) => handleChange('email', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Clinic Address"
                placeholderTextColor="#a0a0a0"
                value={form.address}
                onChangeText={(value) => handleChange('address', value)}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Brief Description"
                placeholderTextColor="#a0a0a0"
                multiline
                numberOfLines={4}
                value={form.description}
                onChangeText={(value) => handleChange('description', value)}
              />
              <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Apply for Approval</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 24,
    elevation: 10,
  },
  visualPanel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  icon: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  panelSubtitle: {
    fontSize: 16,
    color: '#fffdf5',
    textAlign: 'center',
  },
  formSection: {
    padding: 24,
    gap: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2f2f2f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffd9b3',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2f2f2f',
    backgroundColor: '#fffaf4',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ff7a18',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#ff7a18',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
