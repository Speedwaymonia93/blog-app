// import React, { useState, useContext } from 'react';

// const AppContext = React.createContext();

// const AppProvider = ({ children }) => {
//     const [defaultLanguage, setDefaultLanguage] = useState("pl");
// console.log({defaultLanguage});
//   return (
//     <AppContext.Provider
//       value={{
//         defaultLanguage, setDefaultLanguage
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };

// export { AppContext, AppProvider };

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();
export const useLanguageContext = () => useContext(AppContext);

export function AppWrapper({ children }) {
  const [language, setLanguage] = useState("pl");
  
  return (
    <AppContext.Provider value={{language, setLanguage}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
