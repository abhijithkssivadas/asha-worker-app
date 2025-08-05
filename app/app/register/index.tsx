import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { isAxiosError } from 'axios';

import { showToast } from "@/lib/showToast";
import axios from '../axios';
import AppLogo from "@/assets/images/logo.png";

const RegisterScreen = () => {

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleContinue = async () => {
  if (!fullName || !mobileNumber) {
    showToast("error", "Missing Fields", "Please fill both fields");
    return;
  }
  
  try {
    const res = await axios.post('/register', {
        full_name: fullName,
        mobile_number: mobileNumber,
      });
    if (res.status === 200 || res.status === 201) {
      setFullName("");
      setMobileNumber("");
      router.push('/login');
    } else {
      showToast("error", "Registration Failed", res.data?.message || "");
    }
    
  } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Server Error";
        showToast("error", "Error", message);
      } else {
        showToast("error", "Unexpected Error");
      }
    }
};

  return (
    <View style={styles.container}>

      <Image source={AppLogo} style={styles.logo} />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your full name"  
         placeholderTextColor="#888" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input}  placeholder="Enter mobile number"
         placeholderTextColor="#888" value={mobileNumber} onChangeText={setMobileNumber} />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

         <Text style={styles.loginText}>
            Have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => router.push("/login")}
            >
              Login
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
  backIcon: {
    marginTop:0
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: "contain",
  },
  formContainer: {
    height:300,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
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
  loginText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
 loginLink: {
    color: "#8a2be2",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;