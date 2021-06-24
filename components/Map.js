import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, Image } from "react-native";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import MapView, {Marker, Circle} from "react-native-maps";
import { FontAwesome5  } from '@expo/vector-icons';

function distance(latitudeRepere, longitudeRepere, latitudeUser, longitudeUser) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((latitudeUser - latitudeRepere) * p) / 2 +
        (c(latitudeRepere * p) *
            c(latitudeUser * p) *
            (1 - c((longitudeUser - longitudeRepere) * p))) /
            2;
    let result = 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = x en m
    return result.toFixed(2);
}

export default function Map({ navigation }) {
    let ready = false;
    let userInPerimeter = false;
    const perimeter = 15;
    const error = null;
    const latitudeRepere = "48.75433026432312";
    const longitudeRepere = "2.482253948345033";
    let latitudeUser = "";
    let longitudeUser = "";
    const circleColor = "rgba(255, 165, 0, 0.5)";

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("La permission à la localisation a été refusée");
                return;
            }
            // let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);

              // let { status } = await Permissions.askAsync(Permissions.LOCATION)
              // if (status !== 'granted') {
              //     console.log('debieeed')
              // }
              let locations = await Location.watchPositionAsync({ accuracy:Location.Accuracy.High, distanceInterval: 1 }, (loc) => setLocation(loc));
              // console.log(locations)
        })();
    }, []);

    let message = "Chargement...";
    if (errorMsg) {
        message = errorMsg;
    } else if (location) {
        latitudeUser = location.coords.latitude;
        longitudeUser = location.coords.longitude;
        message = "Veuillez rentrer dans la zone";
    }

    let distanceUser = distance(
        latitudeRepere,
        longitudeRepere,
        latitudeUser,
        longitudeUser
    );

    userInPerimeter = distanceUser < perimeter;
    console.log("distance :", distanceUser + "m");
    console.log("périmètre :", userInPerimeter);

    let welcomeMsg = "Veuillez rentrer dans l'entrepôt !";
    let textUserNotInPerimeterOrLoadingLocation = "Chargement..."
    if (userInPerimeter) {
        welcomeMsg = "Bienvenue sur le site";
    }

    return (
      <View style={styles.body}>
      
        <MapView
          style={styles.map}
          
          initialRegion={{
            latitude: latitudeRepere,
            longitude: longitudeRepere,
            latitudeDelta: 0.0083,
            longitudeDelta: 0.0074,
          }}
          rotateEnabled={false}
          showsUserLocation={true}
          >
            <Circle
              center={{
                latitude: latitudeRepere,
                longitude: longitudeRepere,
              }}
              radius={perimeter}
              fillColor={circleColor}
              strokeColor={circleColor}
            />
        </MapView>
        {!userInPerimeter && (
        // <View>
          <Text style={styles.notInThePerimeter}> {message} </Text>
        // </View>
        )}
        {userInPerimeter && (
        <View style={styles.buttonShowCamera} >
          <TouchableOpacity
              onPress={() => {
                  navigation.navigate('Camera');
              }}>
            <FontAwesome5 name="qrcode" size={70} color="orange" />
          </TouchableOpacity>
        </View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
      },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    notInThePerimeter: {
      position: 'absolute',
      top: '50%', 
      alignSelf: 'center', 
      fontSize: "25%",
      color: "orange",
      backgroundColor: "black",
    },
    buttonShowCamera: {
      position: 'absolute',
      bottom: '5%', 
      alignSelf: 'center'
    },
    text: {
        fontSize: 50,
        color: "orange",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },

});
