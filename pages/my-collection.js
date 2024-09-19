// pages/my-collection.js

import React, { useState, useContext } from 'react';
import { CollectionContext } from '../contexts/CollectionContext';
import Navbar from '../components/Navbar';
import styles from '../styles/MyCollection.module.css';
import ObjectCard from '../components/ObjectCard';

const MyCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { collection } = useContext(CollectionContext);

    const openModal = (imageUrl) => {
        setModalContent(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>
                <h1 className={styles.title}>My Collection</h1>
                <div className={styles.grid}>
                    {collection.map((object, index) => (
                        <ObjectCard key={index} object={object} onImageClick={openModal} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyCollection;