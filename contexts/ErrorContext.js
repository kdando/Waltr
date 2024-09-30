// contexts/ErrorContext.js

import { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const triggerError = (message) => {
        setErrorMessage(message);
    };

    const clearError = () => {
        setErrorMessage(null);
    };

    return (
        <ErrorContext.Provider value={{ errorMessage, triggerError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
