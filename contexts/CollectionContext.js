// contexts/CollectionContext.js

import { createContext, useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { app } from '../firebase';

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {

    const { data: session } = useSession();  // Get current session
    const [collection, setCollection] = useState([]);
    const db = getFirestore(app);

    // if user is logged in, fetch their collection
    useEffect(() => {
        if (session) {
            const fetchCollection = async () => {
                const docRef = doc(db, 'collections', session.user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCollection(docSnap.data().collection || []);
                }
            };

            fetchCollection();
        }
    }, [session]);

    const addToCollection = (object) => {
        setCollection((prevCollection) => {
            const newCollection = [...prevCollection, object];
            saveCollectionToFirestore(newCollection);
            return newCollection;
        });
    };

    const removeFromCollection = (objectId) => {
        setCollection((prevCollection) => {
            const newCollection = prevCollection.filter(obj => obj.objectID !== objectId);
            saveCollectionToFirestore(newCollection);
            return newCollection;
        });
    };

    const saveCollectionToFirestore = async (newCollection) => {
        if (session) {
            const docRef = doc(db, 'collections', session.user.email);
            try {
                await setDoc(docRef, { collection: newCollection });
            } catch (error) {
                console.error("Error saving collection: ", error);
            }
        }
    };

    return (
        <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};
