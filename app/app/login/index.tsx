import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { isAxiosError } from 'axios';

import { showToast } from "@/lib/showToast";
import axios from '../axios';
import AppLogo from "@/assets/images/logo.png";

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSendOtp = async () => {

  if (!mobileNumber) {
    showToast("error","Please enter mobile number")
    return;
  }

  try {
    const res = await axios.post('/send-otp', {
     mobile_number: mobileNumber
    });

    if (res.data.success) {
      await AsyncStorage.setItem('ashaMobile', mobileNumber);
      showToast("success", "OTP sent successfully");
      router.push({ pathname: "/otp-verify", params: { mobileNumber } });
    } else {
      showToast("error", res.data.message || "OTP sending failed");
    }
      setMobileNumber("");

  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      showToast("error", error.response?.data?.message || "Server Error");
    } else {
      showToast("error", "Unexpected Error");
    }
  }
};

  return (
    <View style={styles.container}>

      <Image source={AppLogo} style={styles.logo} />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          placeholderTextColor="#888"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => router.push("/register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#8a2be2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  registerLink: {
    color: "#8a2be2",
    textDecorationLine: "underline",
  },
});