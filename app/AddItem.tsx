import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { GlobalContext } from '@/context/GlobalContext';
import BottomSheetModal from '@/components/UI/BottomSheetModal';

type FormItemProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const FormItem: React.FC<FormItemProps> = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.subFormContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} />
      <FontAwesome5 name="chevron-right" size={14} color="#61677A" style={styles.icon} />
    </View>
  );
};

const AddItemComponent: React.FC = () => {
  const { image, setImage, itemNames, setItemNames, itemColor, setItemColor, itemSize, setItemSize, isModalOpen, setIsModalOpen , selectedOption, setSelectedOption } = useContext(GlobalContext);

  const handleSaveItemSize = () => {
    console.log("itemSize", selectedOption);
    console.log("itemNames", itemNames);
    console.log("itemColor", itemColor);
    console.log("image", image);
  }

  const toggleModalPopUp = () => {
    setIsModalOpen(true);
  }

  const handleSelectItemSize = (size: string) => {
    if (!selectedOption.includes(size)) {
      // Add the size to the selectedOption if it's not already selected
      setSelectedOption([...selectedOption, size]);
    }
  }

  const handleRemoveItemSize = (size: any) => {
    // Remove the size from the selectedOption
    setSelectedOption((prevSelected:any) => prevSelected.filter((item: any) => item !== size));
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageUploaderContainer}>
        <FontAwesome5 name="image" size={34} color="black" />
        <Feather name="upload-cloud" size={24} color="black" style={styles.uploadIcon} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainFormContainer}>
          <FormItem label="Item Name" placeholder="Enter Item Name" value={itemNames} onChangeText={setItemNames} />

          <TouchableOpacity onPress={toggleModalPopUp}>
            <View style={styles.subFormContainer}>
              <Text style={styles.label}>Item Size</Text>
              {Array.isArray(selectedOption) && selectedOption.length > 0 ? (
                <View style={styles.tagContainer}>
                  <FlatList
                    data={selectedOption}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.tag} onPress={() => handleRemoveItemSize(item)}>
                        <Text style={styles.tagText}>{item}</Text>
                        <FontAwesome5 name="times" size={12} color="white" style={styles.tagCloseIcon} />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    horizontal // Set horizontal to true for a horizontal list
                  />
                </View>
              ) : (
                <TextInput style={styles.input} placeholder={"Enter Item Size"} editable={false}/>
              )}
              <FontAwesome5 name="chevron-right" size={14} color="#61677A" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <FormItem label="Item Color" placeholder="Item Color (Optional)" value={itemColor} onChangeText={setItemColor} />
          <BottomSheetModal />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addItemButton} onPress={handleSaveItemSize}>
        <Text style={styles.addItemButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    // Remaining styles are unchanged
    age: {
        fontSize: 14,
        fontWeight: '400',
        color: '#61677A',
        marginLeft: 20,
        paddingVertical: 5,
    },
    selectedAge: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
        backgroundColor: '#1E90FF',
        marginLeft: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        position: 'relative', // To allow absolute positioning of the button
    },
    imageUploaderContainer: {
        width: 87,
        height: 83,
        borderRadius: 16,
        backgroundColor: '#D8D9DA',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginTop: 20,
        marginBottom: 20,
    },
    uploadIcon: {
        position: 'absolute',
        bottom: -7,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 2,
        elevation: 3,
    },
    scrollContainer: {
        flexGrow: 1, // Allow content to scroll if it exceeds screen height
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainFormContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    subFormContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.1,
        borderBottomColor: '#1E1E1E',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#61677A',
    },
    input: {
        fontSize: 14,
        fontWeight: '400',
        color: '#61677A',
        marginLeft: 20,
        height: 40,
    },
    icon: {
        marginLeft: 20,
    },
    addItemButton: {
        position: 'fixed',
        bottom: 20,
        width: 327,
        paddingTop: 20,
        paddingBottom: 18,
        borderRadius: 16,
        backgroundColor: '#27374D',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    addItemButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tagContainer: {
        width: '55%',
        flexDirection: 'row',
        marginTop: 2,
        marginLeft: 30,

      },
      tag: {
        backgroundColor: '#CBFFA9',
        borderColor: '#8EAC50',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginRight: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
      },
      tagText: {
        color: '#61677A',
        marginRight: 6,
        fontSize: 14,
        fontWeight: 'bold',
      },
      tagCloseIcon: {
        marginLeft: 6,
        color: '#61677A',
      },
});

export default AddItemComponent;


