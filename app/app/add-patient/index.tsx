import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AddPatientScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    console.log({ name, age, gender, address, notes });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Age"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Select Gender</Text>
      <View style={styles.genderGroup}>
        {['Male', 'Female', 'Others'].map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioContainer}
            onPress={() => setGender(option)}
          >
            <View style={styles.radioOuter}>
              {gender === option && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Patient Address"
        placeholderTextColor="#888"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Health Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Condition, symptoms, meds, notes..."
        placeholderTextColor="#888"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPatientScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical:15,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  genderGroup: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioLabel: {
    marginLeft: 6,
  },
  button: {
    backgroundColor: '#8a2be2',
    marginTop: 20,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
