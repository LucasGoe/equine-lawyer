import React, { createContext, useState } from 'react';

export const LanguageContext = createContext('');

function LanguageContextProvider({ children }) {
    const [selectedLanguage, setSelectedLanguage] = useState('nl');

    function toggleLanguage() {
        if (selectedLanguage === 'nl') {
            setSelectedLanguage('en');
        } else {
            setSelectedLanguage('nl');
        }
    }

    return (
        <LanguageContext.Provider value={{
            toggleLanguage,
            activeLanguage: selectedLanguage,
        }}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageContextProvider;
