import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Table, Text, View, TouchableOpacity, Dimensions, Image, Pressable, Modal, Alert, TextInput } from "react-native";
import { DataTable, Button  } from 'react-native-paper';

export default function ShowTable({ route, navigation }) {
  const { data } = route.params;
  console.log('data :',data);
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const [stockEntrepot, onChangeStockEntrepot] = React.useState(data.quantity_entrepot);
  const [stockRayon, onChangeStockRayon] = React.useState(data.quantity_rayon);

  return (
    <View style={styles.body}>
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
          <DataTable.Cell>Identifiant</DataTable.Cell>
          <DataTable.Cell>{data.id}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Marque</DataTable.Cell>
          <DataTable.Cell >{data.company_name}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Nom</DataTable.Cell>
          <DataTable.Cell >{data.name}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Quantité entrepôt</DataTable.Cell>
          <DataTable.Cell >{data.quantity_entrepot}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Quantité en rayon</DataTable.Cell>
          <DataTable.Cell>{data.quantity_rayon}</DataTable.Cell>
        </DataTable.Row>

      <View style={styles.optionButtons}>
        <TouchableOpacity >
          <Button style={styles.optionButton} mode="contained" color="#ff914d" onPress={ () => setModalVisible(true) }> Modifier le stock </Button>
            {modalVisible && (<View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Stock entrepot</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeStockEntrepot}
                    value={stockEntrepot}
                    defaultValue={stockEntrepot}
                    placeholder="Ex : 5"
                    keyboardType="numeric"
                  />
                  <Text style={styles.modalText}>Stock rayon</Text>
                  <TextInput
                        style={styles.textInput}
                        onChangeText={onChangeStockRayon}
                        value={stockRayon}
                        defaultValue={stockRayon}
                        placeholder="Ex : 5"
                        keyboardType="numeric"
                      />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      SendData(data.id, stockEntrepot, stockRayon, data.company_name, data.name)
                      setModalVisible(!modalVisible)
                      }
                    }
                  >
                    <Text style={styles.textStyle}>Confirmer</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View> ) }
        </TouchableOpacity>
      </View>
      </DataTable>
    </View>
  )
}

function SendData(id, stockEntrepot, stockRayon, companyName, name) {
  fetch(`editProduct?id=${id}&quantity_rayon=${stockRayon}&quantity_entrepot=${stockEntrepot}&company_name=${companyName}&product=${name}`)
  .then(function(response){
    return response.blob()
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});