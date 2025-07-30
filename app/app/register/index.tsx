import { Text, View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AppLogo from "@/assets/images/logo.png";
import { router } from "expo-router";

const RegisterScreen = () => {

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleContinue = async () => {
  console.log("Full Name:", fullName);
  console.log("Mobile Number:", mobileNumber);

  if (!fullName || !mobileNumber) {
    alert("Please fill both fields");
    return;
  }

  try {
    const res = await fetch("http://192.168.43.176:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,     
        mobile_number: mobileNumber, 
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/login");
    } else {
      alert(data.message || "registration failed");
    }
    
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }

  setFullName("");
  setMobileNumber("");
};

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image source={AppLogo} style={styles.logo} />

      {/* Input Container */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter your full name"  
         placeholderTextColor="#888" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input}  placeholder="Enter mobile number"
         placeholderTextColor="#888" value={mobileNumber} onChangeText={setMobileNumber} />

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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
});

export default RegisterScreen;
