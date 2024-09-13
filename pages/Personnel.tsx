import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const userr = require('../images/userr.png');

interface Personnel {
  id: number;
  name: string;
  lastName: string;
  profileImage: string;
}

export const Personnel = () => {
  const navigation = useNavigation<any>();
  const [personnelData, setPersonnelData] = useState<Personnel[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPersonnelData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const fetchPersonnelData = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/a10a57e4-181d-4df0-a3d7-62aac084f739');
      const dataWithImages = response.data.map((person: any) => ({
        id: person.id,
        name: person.name.split(' ')[0], 
        lastName: person.name.split(' ')[1] || '',
   
      }));
      setPersonnelData(dataWithImages);
    } catch (error) {
      console.error('Error fetching personnel data:', error);
    }
  };

  useEffect(() => {
    fetchPersonnelData(); 
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPersonnelData(); 
    }, [])
  );

  const handleAddNewPersonnel = () => {
    navigation.navigate('AddNewPersonnel', { refresh: true }); 
  };

  const handleFramePress = (id: number) => {
    navigation.navigate('PersonnelInfo', { id });
  };

  return (
    <ScrollView style={styles.container} 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewPersonnel}>
          <Ionicons name="person-add-outline" size={25} color="black" />
          <Text style={styles.addText}>Add New Personnel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {personnelData.map(person => (
          <TouchableOpacity
            key={person.id}
            style={styles.frame}
            onPress={() => handleFramePress(person.id)}
          >
       
            <Image source={ userr } style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{person.name} {person.lastName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    marginTop: 60,
    padding: 20,
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
  addText: {
    color: '#000',
    marginLeft: 10,
    fontSize: 16, 
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6B00',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%', 
    maxWidth: 350,
    height: 70,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    color: '#333',
  },
});
