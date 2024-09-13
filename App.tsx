import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import { LogIn } from './pages/LogIn';
import { AddNewPersonnel } from './pages/AddNewPersonnel';
import PersonnelInfo from './pages/PersonnelInfo';
import { AddNewCustomer } from './pages/AddNewCustomer';
import EditPersonnel from './pages/EditPersonnel';
import HotelRooms from './pages/HotelRooms';
import { ForgotPassword } from './pages/ForgotPassword';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="DrawerNavigator">
 {/* <Stack.Screen name="LogIn" options={{ headerShown: false }}>
          {props => <LogIn {...props} setUser={setUser} />} 
        </Stack.Screen>
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />  */}
        <Stack.Screen name="DrawerNavigator" options={{ headerShown: false }}>
          {props => <DrawerNavigator {...props} user={user} />} 
        </Stack.Screen>
   {/* <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewPersonnel" component={AddNewPersonnel} options={{ headerShown: false }} />
        <Stack.Screen name="PersonnelInfo" component={PersonnelInfo} options={{ headerShown: false }} />
        <Stack.Screen name="EditPersonnel" component={EditPersonnel} options={{ headerShown: false }} />  
        <Stack.Screen name="HotelRooms" component={HotelRooms} options={{ headerShown: false }} />   */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

