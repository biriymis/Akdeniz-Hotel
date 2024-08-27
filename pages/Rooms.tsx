import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

interface Period {
  startDate: string;
  endDate: string;
  available: boolean;
}

interface Room {
  room_number: string;
  room_type: string;
  room_status: string;
  room_price: number;
  availability: Period[];
}

const Rooms: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>('all'); 
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/536e42bf-0b67-4728-b081-577ce0a08585');
        setRoomsData(response.data.rooms);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, []);

  useEffect(() => {
    const checkAvailableRooms = () => {
      const availableRooms = roomsData.filter(room => {
        return room.availability.some(period => {
          return selectedDates.every(date => {
            const dateObj = new Date(date);
            const startDate = new Date(period.startDate);
            const endDate = new Date(period.endDate);
            return dateObj >= startDate && dateObj <= endDate && period.available;
          });
        });
      });
      setAvailableRooms(availableRooms);
    };

    if (roomsData.length > 0) {
      checkAvailableRooms();
    }
  }, [selectedDates, roomsData]);


  //gün seçerken, tıkladığımız gün öncesinde eğer seçiliyse siler eğer seçilmemişse seçer işlemi
  
  const handleDayPress = (day: any) => {
    const dateString = day.dateString;
    setSelectedDates(prevDates => {
      if (prevDates.includes(dateString)) {
        return prevDates.filter(date => date !== dateString);
      } else {
        return [...prevDates, dateString];
      }
    });
  };

  const handleRoomTypeChange = (type: string) => {
    setSelectedRoomType(type);
  };

  const handleRoomSelection = (room: Room) => {
    setSelectedRoom(room);
    setShowActionModal(true);
  };

  const handleActionChoice = (action: string) => {
    if (selectedRoom) {
      if (action === 'reserve' || action === 'booked') {
        navigation.navigate('AddNewCustomer'); 
      }
    }
    setShowActionModal(false);
    setModalVisible(false);
  };
//burda uygun oda var mı yok mu onu kontrol ediyoruz. Öncelikle seçtiğimiz oda tipi ile datadaki oda tiplerini eşliyor ve eğer seçtiğimiz gün içerisinde o tipde oda büyüklüğü sıfırdan büyükse ekrana yansıtıyor yoksa no avaliable rooms diyor.
  const renderAvailableRooms = useMemo(() => {
    const filteredRooms = availableRooms.filter(room => room.room_type === selectedRoomType || selectedRoomType === 'all');
    return filteredRooms.length > 0 ? (
      filteredRooms.map(room => (
        <TouchableOpacity key={room.room_number} style={styles.roomContainer} onPress={() => handleRoomSelection(room)}>
          <Text style={styles.roomText}>Room {room.room_number} - {room.room_type}</Text>
          <Text>Price: ${room.room_price}</Text>
          <Text>Status: {room.room_status}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.noRoomsText}>No available rooms of selected type found for selected dates.</Text>
    );
  }, [availableRooms, selectedRoomType]);


  //seçtiğimiz günü yeşile boyuyor.
  const markedDates: Record<string, any> = useMemo(() => {
    return selectedDates.reduce((acc, date) => {
      acc[date] = { selected: true, selectedColor: 'lightgreen' };
      return acc;
    }, {} as Record<string, any>);
  }, [selectedDates]);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        style={styles.calendar}
      />

      <Picker
        selectedValue={selectedRoomType}
        onValueChange={handleRoomTypeChange}
        style={styles.picker}
      >
        <Picker.Item label="All Types" value="all" />
        <Picker.Item label="Single" value="Single" />
        <Picker.Item label="Double" value="Double" />
        <Picker.Item label="Suite" value="Suite" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Check Available Rooms</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            {renderAvailableRooms}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={showActionModal}
        onRequestClose={() => setShowActionModal(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.actionText}>Do you want to make a reservation or mark it as booked?</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleActionChoice('reserve')}>
            <Text style={styles.buttonText}>Reserve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleActionChoice('booked')}>
            <Text style={styles.buttonText}>Booked</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowActionModal(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:70,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    justifyContent: 'center',
  },
  roomContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomText: {
    fontSize: 16,
  },
  noRoomsText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  picker: {
    marginVertical: 10,
  },
  actionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Rooms;
