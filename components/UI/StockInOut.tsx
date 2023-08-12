import { GlobalContext } from '@/context/GlobalContext';
import React, { useContext } from 'react';
import {  Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import ItemDetailQuantity from './ItemDetailQuantity';
import StockOutItemDetail from './StockOutItemDetail';


const StockInOut = ({ID}:any) => {
  const { isStockInOut, setIsStockInOut ,setIsQuantityModalOpen , isQuantityModalOpen ,isStockOutModalOpen, setIsStockOutModalOpen} = useContext(GlobalContext);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isStockInOut}
        onRequestClose={() => {
          setIsStockInOut(!isStockInOut);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.UpperContainer}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
                color: 'black',
                textAlign: 'left',

              }}>Select</Text>
              <Entypo onPress={() => setIsStockInOut(false)} name="cross" size={24} color="black" />
            </View>
            <View style={styles.cardMainContainer}>
              <View style={styles.upperSection}>
                <Text style={styles.headerText}>Stock in/out</Text>
              </View>
              <View style={styles.listMainContainer}>
                <Pressable style={styles.listContainer} onPress={()=>setIsQuantityModalOpen(true)} >
                  <View style={styles.iconLabelContainer}>
                    <FontAwesome5 size={18} style={{ marginBottom: -3 }} name="box" color="#ffa726" />
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#27374D' }}>Stock in</Text>
                  </View>
                  <FontAwesome5 name="chevron-right" size={18} color="#27374D" />
                </Pressable>
                <Pressable style={styles.listContainer} onPress={()=>setIsStockOutModalOpen(true)} >
                  <View style={styles.iconLabelContainer}>
                    <FontAwesome5 size={18} style={{ marginBottom: -3 }} name="box-open" color="#C70039" />
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#27374D' }}>Stock Out</Text>
                  </View>
                  <FontAwesome5 name="chevron-right" size={18} color="#27374D" />
                </Pressable>

              </View>
            </View>

          </View>
        </View>
      </Modal>

      {isQuantityModalOpen && (<ItemDetailQuantity ID={ID}
      />)}
      {
        isStockOutModalOpen && (<StockOutItemDetail ID={ID} />)
      }
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal to the bottom of the screen
    alignItems: 'center',
    position: "relative"


  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center', // Align items at the starting of the modal
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2, // Adjust the vertical position of the shadow
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%', // Set the width to fill the entire screen
    maxHeight: '50%', // Set the maximum height for the modale
    height: 'auto',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  button: {
    borderRadius: 10,
    padding: 10,

    color: "black"
  },
  buttonClose: {
    backgroundColor: '#9288F8',
    position: 'absolute', // Here is the trick
    bottom: 0, // Here is the trick
    left: 80, // Here is the trick
    right: 0, // Here is the trick
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  checkBoxSelected: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    padding: 5,
  },
  checkBoxLabel: {
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxLabelSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  UpperContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,

  },
  cardMainContainer: {
    width: 320,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  upperSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27374D',
  },
  listMainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
});

export default StockInOut;
