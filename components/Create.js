import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Table, Text, View, TouchableOpacity, Dimensions, Image, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, Pressable,Modal,Alert, } from "react-native";
import { DataTable, Button  } from 'react-native-paper';

export default function ShowTable({ route, navigation }) {
  const { data } = route.params;
  console.log('data :',data);

  const [nomMarque, onChangeNomMarque] = React.useState(null); 
  const [nomProduit, onChangeNomProduit] = React.useState(null);  
  const [stockEntrepot, onChangeStockEntrepot] = React.useState(0);
  
  
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
      {children}
    </TouchableWithoutFeedback>
  );
  
  return (
    <View style={styles.body} >
        <View style={styles.squareProduct} >
          <Image
              source={{
                uri:'https://images.freeimages.com/images/large-previews/911/box-1239004.jpg',
              }}
              style={styles.productImage}
          />
        </View>

        <Text style={styles.productHeading}> Product n°{data.id}</Text>

        <DataTable style={styles.datatable}>
          
          <DataTable.Row>
            <DataTable.Cell>Marque</DataTable.Cell>
            <View style={styles.inputViewMarque}>
              <TouchableOpacity>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNomMarque}
                  value={nomMarque}
                  placeholder="Ex : SONY"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </TouchableOpacity>
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Nom</DataTable.Cell>
            <View style={styles.inputViewProduit}>
              <TouchableOpacity >
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNomProduit}
                  value={nomProduit}
                  placeholder="Ex : Playstation 5"
                />
              </TouchableOpacity >
            </View>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Quantité entrepôt</DataTable.Cell>
            <View style={styles.inputViewQuantite}>
              <TouchableOpacity>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeStockEntrepot}
                  value={stockEntrepot}
                  placeholder="Ex : 5"
                  keyboardType="numeric"
                />
              </TouchableOpacity>
            </View>
          </DataTable.Row>

          <View style={styles.optionButtons}>
            <TouchableOpacity >
              <Button style={styles.optionButton} mode="contained" color="#ff914d" onPress={() => InsertProduct(nomMarque, nomProduit, stockEntrepot, data)} >
                Confirmer 
              </Button>
            </TouchableOpacity>
          </View>
        </DataTable>
    </View>
  )
}

function InsertProduct(nomMarque, nomProduit, quantiteEntrepot, itemId) {
  console.log(nomMarque, nomProduit, quantiteEntrepot, itemId);
  const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name : nomProduit, item_id : itemId, quantity_entrepot : quantiteEntrepot, company_name : nomMarque })
    };
  fetch(`https://fast-ocean-88860.herokuapp.com/insertProducts`,requestOptions)
  .then(response => {
    response.json()
    })
    .then(result => {
      console.log('result : ',result)
    })
  
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
      },
    datatable: {
        paddingLeft : 20,
        paddingRight: 20,
        paddingVertical: 20
      },
    optionButtons: {
      flexDirection: "row",
      alignSelf: "center",

    },
    optionButton: {
      marginTop: 20,
      marginHorizontal: 20,
    },

    squareProduct: {
      marginTop: 35,
      borderRadius: "5%",
      alignSelf: "center",
      width: 160, 
      height: 160,
      marginVertical: 20,
      backgroundColor: "grey", 
    },
    productImage: {
      alignSelf: "center",
      width: 130, 
      height: 130, 
      marginTop: 15
    },
     productHeading: {
      alignSelf: "center",
    },
    input: {
      height: 40,
      margin: 12,
      textAlign: 'left',
    },
    inputViewMarque: {
      // marginRight: "28%",
      // marginTop: "5%",
      alignItems: 'start',
      textAlign: 'left',
    },
  // inputViewProduit: {
  //   marginRight: "13%",
  //   marginTop: "5%",
  // },
  // inputViewQuantite: {
  //   marginRight: "37%",
  //   marginTop: "5%",
  // },
});