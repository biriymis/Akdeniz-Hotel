import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainPage } from './pages/MainPage';
import   Customer  from './pages/Customer';
import  {Personnel} from './pages/Personnel';
import { Reservation } from './pages/Reservation';
import  Rooms  from './pages/Rooms';
import CustomDrawer from './components/CustomDrawer';
import Navbar from './components/Navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerScreenProps } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={({ route, navigation }: DrawerScreenProps<any>) => ({
      header: () => <Navbar navigation={navigation} />, 
      drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      drawerActiveBackgroundColor: '#FF6B00',
      drawerActiveTintColor: 'black',
      drawerIcon: ({ color }) => {
        let iconName;
        switch (route.name) {
          case 'Menu':
            iconName = 'home-outline';
            break;
          case 'Reservation':
            iconName = 'notifications-outline';
            break;
          case 'Customer':
            iconName = 'accessibility-outline';
            break;
          case 'Rooms':
            iconName = 'bed-outline';
            break;
          case 'Personnel':
            iconName = 'person-outline';
            break;
        }
        return <Ionicons name={iconName ?? 'home-outline'} size={22} color={color} />;
      },
    })}
  >
    <Drawer.Screen name="Menu" component={MainPage} />
    <Drawer.Screen name="Reservation" component={Reservation} />
    <Drawer.Screen name="Customer" component={Customer} />
    <Drawer.Screen name="Rooms" component={Rooms} />
    <Drawer.Screen name="Personnel" component={Personnel} />
  </Drawer.Navigator>
);

export default DrawerNavigator;