import { createContext, useState, useContext } from "react";
import en from "../translations/en.json";
import lovasikia from "../translations/lovasikia.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translations = { en, lovasikia };

  // Translation function
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook
export const useLanguage = () => useContext(LanguageContext);
