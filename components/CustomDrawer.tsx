import React from "react";
import { View, Text, ImageBackground, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const { user } = props; 
  const userImage = user?.imageUrl || 'https://default-image-url.com'; 
  const userName = user?.name || 'Guest'; 

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#ffffff' }}>
        <ImageBackground
          source={require('../images/orange.png')}
          style={{ padding: 60 }}>
          <Image source={{ uri: userImage }} style={{ borderRadius: 20, width: 50, height: 50 }} />
          <Text style={{ color: 'black', fontSize: 18, fontStyle: 'italic', }}>
            Welcome {userName}!
          </Text>
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LogIn')}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="log-out-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
