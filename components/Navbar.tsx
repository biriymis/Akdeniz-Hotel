import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const logo = require('../images/logo.png');


type NavbarProps = {
  navigation: DrawerNavigationProp<any>;
};

const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>AKDENİZ HOTEL</Text>
      <Image source={logo} style={styles.logo} />
      <View style={styles.menu}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} >
        <Feather name="menu" size={30}/>
      </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: '100%',
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
    marginStart: 120,
  },
  logo: {
    width: 25,
    height: 25,
    marginTop: 15,
    marginLeft: 30,
  },

  menu:{
    position:'absolute',
    left:10,
    top:23
  }
});

export default Navbar;
