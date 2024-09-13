import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const LogIn = ({ setUser }: { setUser: (user: any) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://run.mocky.io/v3/fedb56b2-827f-4323-8d65-fc139bc77809', {
        username,
        password
      });

      const user = response.data.users.find((user: any) => user.username === username && user.password === password);

      if (user) {
        Alert.alert('Login Successful', `Welcome ${user.user.name}!`);
        setUser(user.user);
        navigation.navigate('DrawerNavigator');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password!');
        setPassword('');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred.');
      console.error(error);
      setPassword('');
    }
  };

  const handleSubmit = () => {
    handleLogin();
    Keyboard.dismiss(); 
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.innercontainer}>  
        <Text style={styles.login}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
          onSubmitEditing={handleSubmit}
         
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          maxLength={8}
          onSubmitEditing={handleSubmit}
        />
      </View>
     
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  innercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#FF6B00',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  login: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginTop: 200,
    padding: 20
  },
  input: {
    height: 50,
    width: 350,
    borderColor: 'lightgray',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 30,
    paddingHorizontal: 8,
    fontSize: 18,
   
  },
  button: {
    height: 50,
    width: 350,
    borderColor: '#FF6B00',
    borderWidth: 1.5,
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 45,
    fontStyle: 'italic',
    fontSize: 20,
    color: 'white',
    marginTop: 80,
    backgroundColor: '#FF6B00',
  }
});
