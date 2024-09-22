// pages/my-collection.js

import React, { useState, useContext } from 'react';
import { CollectionContext } from '../contexts/CollectionContext';
import Navbar from '../components/Navbar';
import ObjectCard from '../components/ObjectCard';

const MyCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { collection } = useContext(CollectionContext);

    const openModal = (object) => {
        setModalContent(object);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar />
            <main >
                <h1 >My Collection</h1>
                <div >
                    {collection.map((object, index) => (
                        <ObjectCard key={index} object={object} onImageClick={openModal} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyCollection;