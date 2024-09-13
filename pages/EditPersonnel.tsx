import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
  id: number;
};

const EditPersonnel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { id } = route.params as RouteParams;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchPersonnelData();
    }
  }, [id]);

  const fetchPersonnelData = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      const person = response.data;
      setName(person.name);
      setEmail(person.email);
      setPhone(person.phone);
      setGender(person.gender || ''); 
      setAddress(person.address?.street || '');
    } catch (error) {
      console.error('Error fetching personnel data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://run.mocky.io/v3/4ba37842-f76d-4008-9c25-ee2144685712/${id}`, {
        name,
        email,
        phone,
        gender,
        address: { street: address }
      });
      
      Alert.alert('Success', 'Personnel information has been updated.');
      navigation.navigate('Personnel');
    } catch (error) {
      console.error('Error updating personnel data:', error);
      Alert.alert('Error', 'Failed to update personnel information.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Save" onPress={handleSave} color={'#FF6B00'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
});

export default EditPersonnel;
