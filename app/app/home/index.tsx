import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios'

const HomeScreen = () => {

const [ashaName, setAshaName] = useState('Loading...');

useEffect(() => {
  const fetchAshaName = async () => {
    try {
      const mobileNumber = await AsyncStorage.getItem('ashaMobile');
      const res = await axios.get(`/asha/${mobileNumber}`);
      setAshaName(res.data.full_name);
    } catch (err) {
      console.error("Error fetching ASHA data:", err);
      setAshaName('Unknown');
    }
  };

  fetchAshaName();
}, []);


  return (
    <View style={styles.container}>

      {/* Profile Section */}
      <View style={styles.topSection}>
        <Text style={styles.profileName}>👤 {ashaName}</Text>
            
      </View>

      {/* Cards */}
      <View style={styles.Row}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/total-patients')}>
          <Text style={styles.cardTitle}>Total Patients</Text>
          <Text style={styles.cardValue}>16</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/total-reports')}>
          <Text style={styles.cardTitle}>Total Reports</Text>
        <Text style={styles.cardValue}>28</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/add-patient')}>
          <Text style={styles.buttonText}>+ Add Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/add-reports')}>
          <Text style={styles.buttonText}>📋 Add Daily Report</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/see-visits')}>
          <Text style={styles.buttonText}>📅 See Visits</Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          router.replace('/login');
             }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 24,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 24,
    marginRight: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
  },
  Row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#e0bbf8',
    padding: 30,
    height: 200,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 15,
  },
  button: {
    backgroundColor: '#8a2be2',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  logoutButton: {
    marginTop: 25,
    paddingVertical: 18,
    alignItems: 'center',
  },
     logoutText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
});