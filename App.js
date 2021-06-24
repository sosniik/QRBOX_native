import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Constants } from 'expo';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Device from 'expo-device';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './components/Detail';
import Map from './components/Map';
import CameraFunc from './components/CameraFunc';
import Create from './components/Create';
import config from "./config"

export default function App() {
  const Stack = createStackNavigator();
  const headerOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  console.log('env :',{config.SERVER_URL})
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Carte">
        <Stack.Screen name="Carte" component={Map} options={headerOptions} />
        <Stack.Screen name="Camera" component={CameraFunc} options={headerOptions} />
        <Stack.Screen name="Detail" title="Fiche détail" component={Detail} options={headerOptions} />
        <Stack.Screen name="Create" title="Nouveau produit" component={Create} options={headerOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
