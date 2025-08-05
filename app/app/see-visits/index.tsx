import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "../axios";
import { showToast } from "@/lib/showToast";

const SeeVisitsScreen = () => {
  const router = useRouter();
  const [visits, setVisits] = useState([]);

  const fetchVisits = async () => {
    try {
      const ashaId = await AsyncStorage.getItem("ashaId");
      const res = await axios.get(`/visits?asha_worker_id=${ashaId}`);

      const formatted = res.data.map((visit) => ({
        ...visit,
        formattedDate: visit.visit_date,
      }));

      setVisits(formatted);
    } catch (err) {
      showToast("error", "Failed to load visits");
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={visits}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          visits.length === 0 && styles.centerEmpty,
        ]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.formattedDate}</Text>
            <Text style={styles.name}>{item.patient_name}</Text>
            <Text style={styles.area}>{item.note || "No health notes"}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Not scheduled upcoming visits</Text>
        }
      />

      <TouchableOpacity
        onPress={() => router.push("/add-visits")}
        style={styles.addButton}
      >
        <Text style={styles.addText}>+ Add Visit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 24,
  },
  listContent: {
    paddingBottom: 16,
  },
  centerEmpty: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 2,
  },
  date: {
    fontSize: 14,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  area: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8a2be2",
    paddingVertical: 14,
    marginBottom: 30,
    borderRadius: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});

export default SeeVisitsScreen;