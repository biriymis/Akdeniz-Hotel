import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Customer {
  Id: number;
  name: string;
  lastname: string;
  mail: string;
  phone: string;
  gender: string;
  nationality: string;
  Idnumber: string;
  birthday: string;
  address: string;
  country: string;
  city: string;
}

export default function Customer() {
  const navigation = useNavigation<any>();
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:62022/api/Customer/Customer?CustomerId=1');
        if (response.data.isSuccess) {
          setCustomer([response.data.data]);
        } else {
          console.error('API Error:', response.data.message);
        }
      } catch (error: any) {
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error(error.message);
        }
        console.error(error.config);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  const handleAddNewCustomer = () => {
    navigation.navigate('AddNewCustomer');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewCustomer}>
          <Ionicons name="person-add-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* <FlatList
        data={customer}
        keyExtractor={(item) => item.Id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.customerCard}>
            <Text>ID: {item.Id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Lastname: {item.lastname}</Text>
            <Text>Email: {item.mail}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Nationality: {item.nationality}</Text>
            <Text>ID Number: {item.Idnumber}</Text>
            <Text>Birthday: {item.birthday}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Country: {item.country}</Text>
            <Text>City: {item.city}</Text>
          </View>
          )}
          /> */}
        </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerCard: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
