import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface Reservation {
  reservationId: string;
  customerId: string;
  roomId: string;
  reservationStatus: string;
  checkin: string;
  checkout: string;
}

export const Reservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/4024806e-4184-42e2-a139-5eb4e9d4aedf');
      setReservations(response.data.reservations);
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const renderItem = ({ item }: { item: Reservation }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Reservation ID: {item.reservationId}</Text>
      <Text style={styles.text}>Customer ID: {item.customerId}</Text>
      <Text style={styles.text}>Room ID: {item.roomId}</Text>
      <Text style={styles.text}>Status: {item.reservationStatus}</Text>
      <Text style={styles.text}>Check-in: {item.checkin}</Text>
      <Text style={styles.text}>Check-out: {item.checkout}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.reservationId + index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    marginTop:70
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
