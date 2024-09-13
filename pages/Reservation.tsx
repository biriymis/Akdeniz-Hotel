import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    fetchReservationData();
  }, []);

  const fetchReservationData = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/803dfe8c-e99f-4948-98e5-db475ab224fb');
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
    marginTop:60
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

  addText: {
    color: '#000',
    marginLeft: 10,
    fontSize: 16,
    padding: 10,

  },
});
