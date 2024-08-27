import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<any>();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('https://run.mocky.io/v3/b37a2aaa-1ca9-41f4-8e51-46980c01b934', { email });

      if (response.data.success) {
        Alert.alert('Success', 'We have sent a password reset link to your email.');
        navigation.navigate('LogIn'); 
      } else {
        Alert.alert('Error', 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.header}>Forgot Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innercontainer: {
    width: '100%',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'lightgray',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop:40,
  },
  button: {
    height: 50,
    borderColor: '#FF6B00',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
