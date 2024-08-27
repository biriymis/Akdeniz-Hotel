import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
/* import { LogIn } from './pages/LogIn';
import  Rooms  from './pages/Rooms'; */
import { AddNewPersonnel } from './pages/AddNewPersonnel';
import PersonnelInfo from './pages/PersonnelInfo';
import { AddNewCustomer } from './pages/AddNewCustomer';
import EditPersonnel from './pages/EditPersonnel';
/* import { ForgotPassword } from './pages/ForgotPassword'; */


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigator" >
  {/*  <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} /> */}
     {/*    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} /> */}
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewCustomer" component={AddNewCustomer} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewPersonnel" component={AddNewPersonnel} options={{ headerShown: false }} />
        <Stack.Screen name="PersonnelInfo" component={PersonnelInfo} options={{ headerShown: false }} />
        <Stack.Screen name="EditPersonnel" component={EditPersonnel} options={{ headerShown: false }} /> 
  
      {/*   <Stack.Screen name="Rooms" component={Rooms} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
