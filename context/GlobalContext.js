import React, { useState, createContext, useEffect, useSyncExternalStore } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [itemNames, setItemNames] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [quantity, setQuantity] = useState(0); // Create a state to hold the final quantity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [isStockOutModalOpen, setIsStockOutModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [isStockInOut , setIsStockInOut] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Load items from local storage when the component mounts and whenever items state changes
  useEffect(() => {
    loadItemsFromLocalStorage();
    // deleteAllItems();
  }, []);

  useEffect(() => {
    saveItemsToLocalStorage();
  }, [items]);


  
  

  // FUNCTIONS
  // IMAGE PICKER
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 4],
      quality: 1,
    });

    setImage(result.assets[0].uri);
    return result;
  };

  



  // Function to load items from local storage
  const loadItemsFromLocalStorage = async () => {
    try {
      const itemsData = await AsyncStorage.getItem("items");
      if (itemsData) {
        const parsedItems = JSON.parse(itemsData);
        setItems(parsedItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to save the items to local storage
  const saveItemsToLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  };

  // Increment function to increment the quantity
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    
  }

  // DECREMENT FUNCTION TO DECREMENT THE QUANTITY
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }

  }


  // increment existing quantity function
// Update quantity function that handles both increment and decrement
const updateExistingQuantity = (id, quantityDifference) => {
  const newItems = items.map(item => {
      if (item.id === id) {
          return {
              ...item,
              quantity: item.quantity + quantityDifference,
          };
      }
      return item;
  });
  setItems(newItems);
};

const StockOutQuantity = (id, quantityDifference) => {
  const newItems = items.map(item => {
      if (item.id === id) {
          return {
              ...item,
              quantity: item.quantity - quantityDifference,
          };
      }
      return item;
  });
  setItems(newItems);
};

  const stockOutIncrement = (id) => {
    StockOutQuantity(id, 1); // Increase quantity by 1
  }
  const stockOutDecrement = (id) => {
    StockOutQuantity(id, -1); // Decrease quantity by 1
  }

// Increment existing quantity function
const incrementExistingQuantity = (id) => {
  updateExistingQuantity(id, 1); // Increase quantity by 1
};

// Decrement existing quantity function
const decrementExistingQuantity = (id) => {
  updateExistingQuantity(id, -1); // Decrease quantity by 1
};


 
  const saveItemWithQuantity = async () => {
    
    try {
      setIsSaving(true);
      const newItem = {
        id: uuidv4(),
        itemNames,
        itemColor,
        selectedOption,
        image,
        quantity, // Save the final quantity in the items array
      };
      setItems(prevItems => [...prevItems, newItem]);

      setImage(null);
      setItemNames("");
      setItemColor("");
      setSelectedOption("");
      setIsSaving(false);
      setQuantity(0); // Reset final quantity after saving
      setIsQuantityModalOpen(false);
      ToastAndroid.show("Item Saved Successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error Saving Item", ToastAndroid.SHORT);
    }
  };

  const deleteAllItems = async () => {
    try {
      await AsyncStorage.removeItem("items");
      setItems([]); // Update the items state to an empty array
      ToastAndroid.show("All Items Deleted Successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error Deleting Items", ToastAndroid.SHORT);
    }
  };





  return (
    <GlobalContext.Provider
      value={{
        image,
        setImage,
        itemNames,
        setItemNames,
        itemColor,
        setItemColor,
        itemSize,
        setItemSize,

        isModalOpen,
        setIsModalOpen,

        isStockOutModalOpen, setIsStockOutModalOpen,
        selectedOption,
        setSelectedOption,
        isSaving,
        setIsSaving,
        isQuantityModalOpen,
        setIsQuantityModalOpen,
        quantity ,// Provide final quantity state
        setQuantity, // Provide the function to update final quantity

        pickImage,

        saveItemWithQuantity,
        items,
        deleteAllItems,
        isStockInOut , setIsStockInOut,

        decrement, // Provide the decrement function
        increment, // Provide the increment function

        incrementExistingQuantity,
        decrementExistingQuantity,
        updateExistingQuantity,
        stockOutIncrement,
        stockOutDecrement,
        StockOutQuantity
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

