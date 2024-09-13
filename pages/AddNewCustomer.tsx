import { Text, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const AddNewCustomer = () => {
  const navigation = useNavigation<any>();
  const [Idnumber, setIdNumber] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  

  useEffect(() => {
    if (Idnumber) {
      fetchCustomerData(Idnumber);
    }
  }, [Idnumber]);

  const fetchCustomerData = async (id: string) => {
    try {
      const response = await axios.get(`https://run.mocky.io/v3/334c118c-354e-4c09-8d6f-0001a3bc0f3b/${id}`);
      if (response.status === 200) {
        const customer = response.data;
        setName(customer.name || '');
        setLastname(customer.lastname || '');
        setMail(customer.mail || '');
        setPhone(customer.phone || '');
        setGender(customer.gender || '');
        setNationality(customer.nationality || '');
        setIdNumber(customer.Idnumber || '');
        setBirthday(customer.birthday || '');
        setAddress(customer.address || '');
        setCountry(customer.country || '');
        setCity(customer.city || '');
      } else {
        Alert.alert('Customer Not Found', 'No customer found with this Passport Id Number.');
        handleReset();
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error fetching customer data.');
      console.error(error);
    }
  };

  const handleSave = async () => {
    const data = {
      Idnumber,
      name,
      lastname,
      mail,
      phone,
      gender,
      nationality,
      birthday,
      address,
      country,
      city,
    };

    try {
      const response = await axios.post('https://run.mocky.io/v3/334c118c-354e-4c09-8d6f-0001a3bc0f3b', data);
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
    setIdNumber('');
    setName('');
    setLastname('');
    setMail('');
    setPhone('');
    setGender('');
    setNationality('');
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
            <Text style={styles.names}>Passport Id Number</Text>
            <TextInput
              style={styles.input}
              value={Idnumber}
              onChangeText={setIdNumber}
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
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f7f7f7',
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
