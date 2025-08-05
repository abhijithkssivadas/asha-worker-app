import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../axios';
import { showToast } from '@/lib/showToast';

const TotalReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReports = async () => {
    try {
      const id = await AsyncStorage.getItem('ashaId');
      const res = await axios.get(`/reports?asha_worker_id=${id}`);
      setReports(res.data);
    } catch (err) {
     showToast('error', err.message || 'Error Fetching Reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

const renderReport = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
    
    <Text style={styles.summaryHeading}>Issues:</Text>
    {Array.isArray(item.issues)
      ? item.issues.map((line, index) => (
          <Text key={index} style={styles.bullet}>• {line}</Text>
        ))
      : <Text style={styles.bullet}>• {item.issues}</Text>
    }
  </View>
);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8a2be2" />
      ) : reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reports found</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={renderReport}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/add-reports')}>
        <Text style={styles.buttonText}>+ Add Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 18,
    marginBottom: 18,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  summaryHeading: {
    marginTop: 6,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#8a2be2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    marginBottom: 18,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default TotalReports;