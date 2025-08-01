import React, { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

const AddReports = () => {
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');

  const handleSave = () => {
    console.log(({ date, summary }));
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <TextInput 
      style={styles.input}
      placeholder='dd/mm/yyyy'
      placeholderTextColor="#888"
      value={date}
      onChangeText={setDate}
      />
      
      <Text style={styles.label}>Issues faced/Summary</Text>
      <TextInput
      style={[styles.input, styles.textArea]}
      placeholder='eg. out of stock medicine, refusal of visit/summary'
      placeholderTextColor="#888"
      value={summary}
      onChangeText={setSummary}
      multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddReports

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
   input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
    textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
    button: {
    backgroundColor: '#8a2be2',
    marginTop: 25,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
    buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})