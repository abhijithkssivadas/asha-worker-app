import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppLogo from "@/assets/images/logo.png";
import { router } from "expo-router";

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSendOtp = async () => {
    console.log("Mobile Number:", mobileNumber);

    if (!mobileNumber) {
      alert("Please enter mobile number");
      return;
    }

    try {
      const res = await fetch("http://192.168.43.176:8080/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile_number: mobileNumber }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push({ pathname: "/otpVerify", params: { mobileNumber } });
      } else {
        alert(data.message || "OTP sending failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }

    setMobileNumber("");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={AppLogo} style={styles.logo} />

      {/* Input Container */}
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

        {/* Send OTP Button */}
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

export default LoginScreen;
