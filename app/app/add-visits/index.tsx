import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "../axios";
import { showToast } from "@/lib/showToast";

const AddVisits = () => {
  const router = useRouter();

  const [visit_date, setVisitDate] = useState("");
  const [patient_name, setPatientName] = useState("");
  const [note, setNote] = useState("");

 const handleSave = async () => {
  try {
    if (!visit_date || !patient_name) {
      showToast("error", "Please fill all required fields");
      return;
    }

    const id = await AsyncStorage.getItem("ashaId");

    const res = await axios.post("/visits", {
      visit_date, 
      patient_name,
      note,
      asha_worker_id: Number(id),
    });

    showToast("success", "Visit saved successfully");
    router.back();
  } catch (err) {
    showToast("error", err.message || "Failed to save visit");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Visit Date</Text>
      <TextInput
        style={styles.input}
        placeholder="dd-mm-yyyy"
        placeholderTextColor="#888"
        value={visit_date}
        onChangeText={setVisitDate}
      />

      <Text style={styles.label}>Patient Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Name"
        placeholderTextColor="#888"
        value={patient_name}
        onChangeText={setPatientName}
      />

      <Text style={styles.label}>Note (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Note"
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#8a2be2",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddVisits;