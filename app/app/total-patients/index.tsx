import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import axios from "../axios";
import { showToast } from '@/lib/showToast';

const TotalPatients = () => {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchPatients = async () => {
    try {
      const id = await AsyncStorage.getItem("ashaId");

      if (!id) {
        setPatients([]);
        return;
      }

      const res = await axios.get(`/patients?ashaWorkerId=${id}`);
      setPatients(res.data);
    } catch (err) {
      showToast('error', err.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPatients();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8a2be2" />
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {patients.length === 0 ? (
            <Text style={{ textAlign: "center", color: "gray" }}>
              No patients found.
            </Text>
          ) : (
            patients.map((patient, index) => (
              <View key={patient.id} style={styles.card}>
                <Text style={styles.name}>
                  {index + 1}. {patient.name}
                </Text>
                <Text style={styles.label}>
                  Age: <Text style={styles.value}>{patient.age}</Text>
                </Text>
                <Text style={styles.label}>
                  Gender: <Text style={styles.value}>{patient.gender}</Text>
                </Text>
                <Text style={styles.label}>
                  Address: <Text style={styles.value}>{patient.address}</Text>
                </Text>
                <Text style={styles.label}>
                  Health Notes:{" "}
                  <Text style={styles.value}>
                    {patient.health_notes || "—"}
                  </Text>
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add-patient")}
      >
        <Text style={styles.buttonText}>+ Add Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  cardContainer: {
    paddingBottom: 100,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
  value: {
    fontWeight: "400",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#8a2be2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TotalPatients;