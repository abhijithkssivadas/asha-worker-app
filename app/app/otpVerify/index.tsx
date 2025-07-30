import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import AppLogo from "@/assets/images/logo.png";
const { mobileNumber } = useLocalSearchParams();

const VerifyScreen = () => {

 const handleResendOtp = async () => {
  try {
    const res = await fetch("http://192.168.43.176:8080/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile_number: mobileNumber }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("OTP resent successfully");
    } else {
      alert(data.message || "Resend failed");
    }
  } catch (err) {
    alert("Error resending OTP");
  }
};

  const { mobileNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Add OTP verification logic here
    console.log("Verifying OTP:", otp);
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image source={AppLogo} style={styles.logo} />

      {/* Form Box */}
      <View style={styles.formContainer}>
        {/* Mobile */}
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber?.toString()}
          editable={false}
        />

        {/* OTP */}
        <Text style={styles.label}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP sent to your number"
          placeholderTextColor="#888"
          value={otp}
          onChangeText={setOtp}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Resend OTP */}
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

export default VerifyScreen;
