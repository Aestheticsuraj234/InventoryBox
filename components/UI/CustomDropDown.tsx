import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type DropDownProps = {
  options: string[];
  selectedValues: string[];
  onSelect: (options: string[]) => void;
};

const CustomDropdown = ({ options, selectedValues, onSelect }: DropDownProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDropOptions, setSelectedDropOptions] = useState(selectedValues);

  const handleSelectOption = (option: string) => {
    if (selectedDropOptions.includes(option)) {
      // If the option is already selected, remove it from the selectedOptions array
      setSelectedDropOptions(selectedDropOptions.filter((item) => item !== option));
    } else {
      // If the option is not selected, add it to the selectedOptions array
      setSelectedDropOptions([...selectedDropOptions, option]);
    }
  };

  const handleSaveOptions = () => {
    onSelect(selectedDropOptions);
    setModalVisible(false); // Close the modal when options are selected
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedText}>
          {selectedDropOptions.length > 0 ? selectedDropOptions.join(', ') : 'Select Option'}
        </Text>
        <AntDesign name="down" size={18} color="#000" />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {options.map((option) => (
            <Pressable key={option} onPress={() => handleSelectOption(option)} style={styles.optionContainer}>
              <View style={styles.radioButton}>
                {selectedDropOptions.includes(option) && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
          <Pressable onPress={handleSaveOptions} style={styles.doneButtonContainer}>
            <Text style={styles.doneButton}>Done</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

// ... (styles remain the same)




const styles = StyleSheet.create({
  // ... Existing styles
  doneButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
    
  },
  dropContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
  },
  doneButton: {
    fontSize: 18,
    paddingVertical: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDropdown;
