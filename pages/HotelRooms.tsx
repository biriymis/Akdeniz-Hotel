import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HotelRooms: React.FC = () => {
  const [roomStatus, setRoomStatus] = useState<{ [key: string]: boolean }>({
    101: true, 102: true, 103: true, 104: true, 105: true, 106: true, 107: true, 108: true, 109: true, 110: true,
    201: true, 202: true, 203: true, 204: true, 205: true, 206: true, 207: true, 208: true, 209: true, 210: true,
    301: true, 302: true, 303: true, 304: true, 305: true, 306: true, 307: true, 308: true, 309: true, 310: true,
    401: true, 402: true, 403: true, 404: true, 405: true, 406: true, 407: true, 408: true, 409: true, 410: true,
  });

  useEffect(() => {
    const loadRoomStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('roomStatus');
        if (storedStatus) {
          setRoomStatus(JSON.parse(storedStatus));
        }
      } catch (error) {
        console.error('Error loading room status:', error);
      }
    };

    loadRoomStatus();
  }, []);

  const toggleRoomStatus = (roomNumber: string) => {
    const updatedStatus = {
      ...roomStatus,
      [roomNumber]: !roomStatus[roomNumber],
    };
    setRoomStatus(updatedStatus);

    AsyncStorage.setItem('roomStatus', JSON.stringify(updatedStatus)).catch(error => {
      console.error('Error saving room status:', error);
    });
  };

  const renderRooms = (floor: number) => {
    return Object.keys(roomStatus)
      .filter(roomNumber => roomNumber.startsWith(floor.toString()))
      .map(roomNumber => (
        <TouchableOpacity
          key={roomNumber}
          style={[
            styles.roomButton,
            { backgroundColor: roomStatus[roomNumber] ? 'white' : 'lightgreen' },
          ]}
          onPress={() => toggleRoomStatus(roomNumber)}
        >
          <Text style={styles.roomText}>{roomNumber} - {roomStatus[roomNumber] ? 'Clean' : 'Dirty'}</Text>
        </TouchableOpacity>
      ));
  };

  return (
    <ScrollView style={styles.container}>
      {[1, 2, 3, 4].map(floor => (
        <View key={floor} style={styles.floorContainer}>
          <Text style={styles.floorText}>Floor {floor}</Text>
          <View style={styles.gridContainer}>
            {renderRooms(floor)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },
  floorContainer: {
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  floorText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomButton: {
    width: '33%',
    padding: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  roomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HotelRooms;
