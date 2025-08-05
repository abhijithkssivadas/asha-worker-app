import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { isAxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showToast } from "@/lib/showToast";
import axios from '../axios';
import AppLogo from "@/assets/images/logo.png";

const OTPVerify = () => {
  const { mobileNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleResendOtp = async () => {
    try {
      const res = await axios.post('/send-otp', { mobile_number: mobileNumber });

      if (res.data.success) {
        showToast("success", "OTP resent successfully");
      } else {
        showToast("error", res.data.message || "Resend failed");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showToast("error", error.response?.data?.message || "Error resending OTP");    
      } else {
        showToast("error", "Unexpected Error");
      }
    }
  };

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      showToast("error", "Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await axios.post('verify-otp', {
        mobile_number: mobileNumber,
        otp_code: otp,
      });

      if (res.data.success) {
        await AsyncStorage.setItem('ashaId', res.data.id.toString());
        await AsyncStorage.setItem('ashaMobile', mobileNumber.toString());


        showToast("success", "OTP verified");
        router.replace('/home')
      } else {
        showToast("error", res.data.message || "OTP verification failed");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showToast("error", error.response?.data?.message || "Error verifying OTP");
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
          value={mobileNumber?.toString()}
          editable={false}
        />

        <Text style={styles.label}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP sent to your number"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={{ color: "#0906adff", textAlign: "center", marginTop: 16 }}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  backIcon: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  formContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  resendText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});

export default OTPVerify;