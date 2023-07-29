import { GlobalContext } from '@/context/GlobalContext';
import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CustomDropdown from './CustomDropDown';

type CheckBoxProps = {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const CheckBox = ({ label, selected, onSelect }: CheckBoxProps) => (
  <Pressable
    style={[styles.checkBox, selected && styles.checkBoxSelected]}
    onPress={() => onSelect(label)}
  >
    <Text style={[styles.checkBoxLabel, selected && styles.checkBoxLabelSelected]}>{label}</Text>
  </Pressable>
);

const BottomSheetModal = () => {
    const { isModalOpen, setIsModalOpen ,selectedOption, setSelectedOption} = useContext(GlobalContext);
   
  
    const handleSelectOption = (option: any) => {
      setSelectedOption(option);
    };
  
    const handleSaveOption = () => {
      // Do something with the selectedOption, e.g., save it to the global state.
      console.log('Selected Option:', selectedOption);
  
      // Close the modal
      setIsModalOpen(false);
    };
  
    return (
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalOpen(!isModalOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
         
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 120 }}>
                <CheckBox
                  label="Kids"
                  selected={selectedOption === 'Kids'}
                  onSelect={handleSelectOption}
                />
                  {selectedOption === 'Kids' && ( <CustomDropdown
                  options={['0-3', '3-6', '6-9', '9-12']}
                  selectedValues={selectedOption === 'Kids' ? [selectedOption] : []}
                  onSelect={handleSelectOption}
                  />
                  )}
              </View>

           
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 120 }}>
                <CheckBox
                  label="Teens"
                  selected={selectedOption === 'Teens'}
                  onSelect={handleSelectOption}
                />
               {selectedOption === 'Teens' && (  <CustomDropdown
                  options={['12-15', '15-17', '17-19']}
                  selectedValues={selectedOption === 'Teens' ? [selectedOption] : []}
                  onSelect={handleSelectOption}
                />
                )}
              </View>

            
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 120 }}>
                <CheckBox
                  label="Adults"
                  selected={selectedOption === 'Adults'}
                  onSelect={handleSelectOption}
                />
             { ( selectedOption === 'Adults' &&  <CustomDropdown
                  options={['19-21', '21-24', '24-26', '26-other']}
                  selectedValues={selectedOption === 'Adults' ? [selectedOption] : []}
                  onSelect={handleSelectOption}
                />)}
              </View>
            

            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSaveOption}>
              <Text style={styles.textStyle}>Save Option</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    );
  };
  

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // Align the modal to the bottom of the screen
    alignItems: 'center',
    position:"relative",

  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'flex-start', // Align items at the starting of the modal
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2, // Adjust the vertical position of the shadow
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%', // Set the width to fill the entire screen
    maxHeight: '70%', // Set the maximum height for the modale
    height:`auto`,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingBottom: 60,
    
  },
  button: {
    borderRadius: 10,
    padding: 10,
   
    color:"black"
  },
  buttonClose: {
    backgroundColor: '#272829',
    position: 'absolute', // Here is the trick
    bottom: 0, // Here is the trick
    left: 80, // Here is the trick
    right: 0, // Here is the trick
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    
    

  },
  textStyle: {
    color: 'white',
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
    justifyContent:'center',
    alignItems:'center',
  },
  checkBoxLabelSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BottomSheetModal;
