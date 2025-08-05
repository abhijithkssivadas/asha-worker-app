import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { isAxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showToast } from '@/lib/showToast';
import axios from '../axios';

const AddReports = () => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [issues, setIssues] = useState('');

  const handleSave = async () => {
    if (!date || !issues) {
      showToast('error', 'Please fill in all fields');
      return;
    }

    try {
      const id = await AsyncStorage.getItem('ashaId');

      if (!id) {
        showToast('error', 'ASHA Worker ID not found');
        return;
      }

      const res = await axios.post('/reports', {
        asha_worker_id: Number(id),
        date,
        issues,
      });

      if (res.data.success) {
        showToast('success', 'Report added successfully');
        router.back();
      } else { 
        showToast('error', res.data.message || 'Failed to add report');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showToast('error', error.response?.data?.message || 'Server error');
      } else {
        showToast('error', 'Unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="dd/mm/yyyy"
        placeholderTextColor="#888"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Issues faced / Summary</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g. out of stock medicine, refusal of visit"
        placeholderTextColor="#888"
        value={issues}
        onChangeText={setIssues}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 180,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#8a2be2',
    marginTop: 25,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddReports;