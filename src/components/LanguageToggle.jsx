"use client";

import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "fr" : "en"
    );
  };

  const value = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

const LanguageToggle = () => {
  const { toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} className="language-toggle">
      Toggle Language
    </button>
  );
};

export default LanguageToggle;
