import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import en from "../translations/en";
import te from "../translations/te";


const LanguageContext =
  createContext(null);


const translations = {
  en,
  te,
};


export function LanguageProvider({
  children,
}) {

  const [language, setLanguage] =
    useState(() => {

      return (
        localStorage.getItem(
          "kanaka-language"
        ) || "en"
      );

    });


  const changeLanguage = (
    nextLanguage
  ) => {

    setLanguage(nextLanguage);

    localStorage.setItem(
      "kanaka-language",
      nextLanguage
    );

  };


  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t: translations[language],
    }),
    [language]
  );


  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {

  const context =
    useContext(LanguageContext);

  if (!context) {

    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );

  }

  return context;
}