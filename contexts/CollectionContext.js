// contexts/CollectionContext.js

import { createContext, useState } from 'react';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [collection, setCollection] = useState([]);

    const addToCollection = (object) => {
        setCollection((prevCollection) => [...prevCollection, object]);
    };

    const removeFromCollection = (objectId) => {
        setCollection((prevCollection) => prevCollection.filter(obj => obj.objectID !== objectId));
    };

    return (
        <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};