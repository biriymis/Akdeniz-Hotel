import { Text, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const AddNewPersonnel = () => {
  const navigation = useNavigation<any>();
  const [Id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [Idnumber, setIdnumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
    const data = {
      Id,
      name,
      lastname,
      mail,
      phone,
      gender,
      Idnumber,
      birthday,
      address,
    };

    try {
      const response = await fetch('https://run.mocky.io/v3/bc7be70b-c256-4539-8c13-21600e06fb8c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert("Saved!", "The new personnel information was successfully saved.");
        navigation.navigate('Personnel'); 
      } else {
        Alert.alert("Error", "There was an error saving the new personnel information.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an error saving the new personnel information.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>New Personnel</Text>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.names}>Personnel Id</Text>
            <TextInput
              style={styles.input}
              value={Id}
              onChangeText={setId}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastname}
              onChangeText={setLastname}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>e-Mail Address</Text>
            <TextInput
              style={styles.input}
              value={mail}
              onChangeText={setMail}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Passport/ID Number</Text>
            <TextInput
              style={styles.input}
              value={Idnumber}
              onChangeText={setIdnumber}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={birthday}
              onChangeText={setBirthday}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
 
    padding: 10,
  },
  scrollContainer: {
    padding: 20,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
    marginRight: 20,
  },
  input: {
    height: 35,
    width: 160,
    borderColor: 'orange',
    borderWidth: 1.5,
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  names: {
    fontSize: 15,
    color: 'black',
 
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  buttonText: {
    height: 35,
    width: 90,
    borderColor: 'orange',
    borderWidth: 1.5,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 35,
    fontSize: 20,
  },
});
