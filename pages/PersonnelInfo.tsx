import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
  id: number;
};

const PersonnelInfo = () => {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [person, setPerson] = useState<any>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (id) {
      fetchPersonData();
    }
  }, [id]);

  const fetchPersonData = async () => {
    try {
      const response = await axios.get(`https://run.mocky.io/v3/6c482efa-0fad-493b-8fab-efd4149810c4`);
      setPerson(response.data);
    } catch (error) {
      console.error('Error fetching person data:', error);
    }
  };

  const handleDeletePersonnel = () => {
    Alert.alert(
      "Delete Personnel",
      "Are you sure you want to delete this personnel?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", onPress: async () => {
            try {
              await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
              navigation.navigate('Personnel');
            } catch (error) {
              console.error('Error deleting personnel:', error);
            }
          }
        }
      ]
    );
  };

  const handleEditPersonnel = () => {
    navigation.navigate('EditPersonnel', { id: id });
  };

  if (!person) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
      <Text style={styles.name}>{person.name} </Text>
      <Text style={styles.details}>ID: {person.id}</Text>
      <Text style={styles.details}>Phone: {person.phone}</Text>
      <Text style={styles.details}>Email: {person.email}</Text>
      <Text style={styles.details}>Address: {person.address?.street}, {person.address?.city}</Text>
      <Text style={styles.details}>National ID: {person.nationalId}</Text>

      <Text style={styles.header}>Leave Tracking</Text>
      {person.leaves && person.leaves.length > 0 ? (
        person.leaves.map((leave: any, index: number) => (
          <Text key={index} style={styles.details}>Date: {leave.date}, Reason: {leave.reason}</Text>
        ))
      ) : (
        <Text style={styles.details}>No leave records available.</Text>
      )}

      <Text style={styles.header}>Cleaning Tracking</Text>
      {person.cleaning && person.cleaning.length > 0 ? (
        person.cleaning.map((cleaning: any, index: number) => (
          <Text key={index} style={styles.details}>Date: {cleaning.date}, Status: {cleaning.status}</Text>
        ))
      ) : (
        <Text style={styles.details}>No cleaning records available.</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleEditPersonnel} style={styles.button}>
          <Text style={styles.addText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletePersonnel} style={styles.button}>
          <Text style={styles.addText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontSize: 18,
    marginVertical: 7,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6B00',
    borderWidth: 1.5,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: 130,
    height: 40,
    justifyContent: 'center',
  },
  addText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default PersonnelInfo;
