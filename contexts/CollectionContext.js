// contexts/CollectionContext.js

import { createContext, useState } from 'react';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [collection, setCollection] = useState([]);

    const addToCollection = (object) => {
        // Normalize the object ID format
        const normalizedObjectId = object.objectId.startsWith('VNA-') ? object.objectId.split('-')[1] : object.objectId;
        setCollection((prevCollection) => [...prevCollection, { ...object, objectId: normalizedObjectId }]);
    };

    const removeFromCollection = (objectId) => {
        const normalizedObjectId = objectId.startsWith('VNA-') ? objectId.split('-')[1] : objectId;
        setCollection((prevCollection) => prevCollection.filter((obj) => obj.objectId !== normalizedObjectId));
    };

    return (
        <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};