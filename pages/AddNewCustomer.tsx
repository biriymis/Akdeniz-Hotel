import { Text, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const AddNewCustomer = () => {
  const navigation = useNavigation<any>();
  const [Id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [Idnumber, setIdNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleSave = async () => {
    const data = {
      Id,
      name,
      lastname,
      mail,
      phone,
      gender,
      nationality,
      Idnumber,
      birthday,
      address,
      country,
      city,
    };

    try {
      const response = await axios.post('https://run.mocky.io/v3/your-mock-api-endpoint', data);
      if (response.status === 201) {
        Alert.alert('Saved!', 'The customer information was successfully saved.');
        navigation.navigate('CustomerScreen');
      } else {
        Alert.alert('Error', 'There was an error saving the customer information.');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error saving the customer information.');
      console.error(error);
    }
  };

  const handleReset = () => {
    setId('');
    setName('');
    setLastname('');
    setMail('');
    setPhone('');
    setGender('');
    setNationality('');
    setIdNumber('');
    setBirthday('');
    setAddress('');
    setCountry('');
    setCity('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>NEW CUSTOMER</Text>
          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.names}>Customer Id</Text>
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
            <Text style={styles.names}>Nationality</Text>
            <TextInput
              style={styles.input}
              value={nationality}
              onChangeText={setNationality}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>Passport Id Number</Text>
            <TextInput
              style={styles.input}
              value={Idnumber}
              onChangeText={setIdNumber}
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
          <View style={styles.row}>
            <Text style={styles.names}>Country</Text>
            <TextInput
              style={styles.input}
              value={country}
              onChangeText={setCountry}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.names}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReset} style={styles.plusButton}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
    borderRadius: 15,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  names: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
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
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 35,
    fontStyle: 'italic',
    fontSize: 20,
  },
  plusButton: {
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    width: 50,
    borderColor: 'orange',
    borderWidth: 1.5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    
  },
  plusButtonText: {
    fontSize: 40,
    color: 'white',
    marginTop:-5,
   
   
  },
});
