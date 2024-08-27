import React from "react";
import { View, Text, ImageBackground, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const user = props.user;
  const userImage = user?.imageUrl; 
  const userName = user?.name; // Kullanıcı adını dinamik olarak alıyoruz

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#ffffff' }}>
        <ImageBackground
          source={require('../images/orange.png')}
          style={{ padding: 70 }}>
          <Image source={{ uri: userImage }} style={{ borderRadius: 20, width: 100, height: 100 }} />
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
