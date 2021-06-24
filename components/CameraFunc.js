import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Entypo } from '@expo/vector-icons';
import BarcodeMask from 'react-native-barcode-mask';

const { width, height } = Dimensions.get('window');
const qrSize = width * 0.7;
const finderWidth: number = 280;
const finderHeight: number = 230;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function CameraFunc({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = async ({ type, data, bounds: {origin} }) => {
      const {x, y} = origin;
      if(x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
        setScanned(true);
        const getProducts = await fetch('https://fast-ocean-88860.herokuapp.com/products/'+data);
        const json = await getProducts.json();
        if(json.length == 0) {
          Alert.alert(
            "Erreur",
            "Aucun produit n'a été trouvé, voulez-vous créer la fiche produit ?",
            [
              {
                text: "Oui",
                onPress: (() => {
                  navigation.navigate('Create', {
                    data: data,
                  });
                }),
                style: "cancel",
              },
              {
                text: "Non",
                onPress: () => setScanned(false),
                style: "cancel",
              },
            ]
          );
        }
        else {
          navigation.navigate('Detail', {
            data: json[0],
          });
        }
      }
    };

    if (hasPermission === null) {
      return <Text>Demande d'accès à la caméra</Text>;
    }
    if (hasPermission === false) {
      return <Text>L'accès à la caméra a été refusé</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}>
          <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
          
          <Text style={styles.description}>Scanner le QR Code</Text>
        </BarCodeScanner>
        <View style={styles.closeCamera}>
          <TouchableOpacity
              style={styles.button}
                onPress={() => {
                    navigation.navigate('Carte');
                }}>
              <Entypo name="circle-with-cross" size={70} color="orange" />
          </TouchableOpacity>
        </View>
        
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    closeCamera: {
      flex: 1,
      position: 'absolute',
      bottom: '5%', 
      alignSelf: 'center' 
    },
    qr: {
      marginTop: '20%',
      marginBottom: '20%',
      marginLeft: "auto",
      marginRight: "auto",
      width: qrSize,
      height: qrSize,
    },
    description: {
      fontSize: width * 0.08,
      marginTop: '40%',
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: 'center',
      width: '70%',
      color: 'orange',
    },
});
