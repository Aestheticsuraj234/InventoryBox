import React, { useState, createContext, useEffect } from 'react';



export const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {

  const [image, setImage] = useState(null);
  const [itemNames, setItemNames] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <GlobalContext.Provider value={{
      image, setImage,
      itemNames, setItemNames,
      itemColor, setItemColor,
      itemSize, setItemSize,
      isModalOpen, setIsModalOpen,
      selectedOption, setSelectedOption
    }}>
      {children}
    </GlobalContext.Provider>
  );
}