import { Text, View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

export const ReservationAdd = () => {
  const [reservationId, setReservationId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [reservationStatus, setReservationStatus] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');



  const handleSave = async () => {
     const data = {
      reservationId,
      customerId,
      roomId,
      reservationStatus,
      checkin,
      checkout,
     };

     try{
      const response = await fetch('https://run.mocky.io/v3/659b27eb-c2f8-4156-a3a4-bd777baafb12', {
       method:'POST',
       headers:{
        'Content-Type':'application/json',
       },
       body:JSON.stringify(data),
      
     });

     if (response.ok){
      Alert.alert("Saved!",  "The reservation was successfully saved.");
     }else{
      Alert.alert("Error", "There was an error saving the reservation.");
     }
     
    }catch (error){
      Alert.alert("Error", "There was an error saving the reservation.");
      console.error(error);
     }
  };
  
  return (
    
    <SafeAreaView style={{ marginTop: 160, marginLeft: 25, padding: 20 }}>
      <Text style={styles.header}>RESERVATION</Text>
      <View style={styles.line}>

      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Reservation Id</Text>
        <TextInput
          style={styles.input}
          value={reservationId}
          onChangeText={setReservationId}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Customer Id</Text>
        <TextInput
          style={styles.input}
          value={customerId}
          onChangeText={setCustomerId}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Room Id</Text>
        <TextInput
          style={styles.input}
          value={roomId}
          onChangeText={setRoomId}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Reservation Status</Text>
        <TextInput
          style={styles.input}
          value={reservationStatus}
          onChangeText={setReservationStatus}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Check-in Date</Text>
        <TextInput
          style={styles.input}
          value={checkin}
          onChangeText={setCheckin}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.names}>Check-out Date</Text>
        <TextInput
          style={styles.input}
          value={checkout}
          onChangeText={setCheckout}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop:-80
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginRight:20
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
    marginTop: 40,
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
});
