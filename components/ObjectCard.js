// components/ObjectCard.js

import React, { useState, useContext } from 'react';
import CustomModal from './Modal';
import { CollectionContext } from '../contexts/CollectionContext';
import styles from '../styles/ObjectCard.module.css';

const ObjectCard = ({ object, onImageClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { collection, addToCollection, removeFromCollection } = useContext(CollectionContext);
    const isInCollection = collection.some(obj => obj.objectID === object.objectID);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.card}>
            {object.primaryImageSmall ? (
                <img src={object.primaryImageSmall} alt={object.title} onClick={openModal} style={{ cursor: 'pointer' }} />
            ) : (
                <p onClick={openModal}>No image available</p>
            )}
            <h2>{object.title}</h2>
            {isInCollection ? (
                <button onClick={() => removeFromCollection(object.objectID)}>Remove from Collection</button>
            ) : (
                <button onClick={() => addToCollection(object)}>Add to Collection</button>
            )}
            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                content={object}
            />
        </div>
    );
};

export default ObjectCard;