import React, { useState, createContext, useEffect } from 'react';



export const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {
const hello="hello"
    return (
        <GlobalContext.Provider value={hello}>
          {children}
        </GlobalContext.Provider>
      );
}