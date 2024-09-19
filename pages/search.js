// pages/search.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import ObjectCard from '../components/ObjectCard';
import styles from '../styles/Search.module.css';
import Navbar from '@/components/Navbar';
import CustomModal from '../components/Modal';
import SearchForm from '../components/SearchForm';
import { CollectionContext } from '../contexts/CollectionContext';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [showInCollection, setShowInCollection] = useState(true);
    const [showHasImages, setShowHasImages] = useState(true);
    const [sortOrder, setSortOrder] = useState('oldestFirst');
    const { collection } = useContext(CollectionContext);

    const handleSearch = async (query, showInCollection, showHasImages, sortOrder) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/search`, {
                params: { query, showInCollection, showHasImages, sortOrder },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (object) => {
        setModalContent(object);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filteredResults = searchResults.filter((result) => {
        const inCollection = collection.some((obj) => obj.objectID === result.objectID);
        if (!showInCollection && inCollection) {
            return false;
        }
        if (showHasImages && !result.primaryImageSmall) {
            return false;
        }
        return true;
    });

    const sortedResults = filteredResults.sort((a, b) => {
        if (sortOrder === 'oldestFirst') {
            return a.objectBeginDate - b.objectBeginDate;
        } else if (sortOrder === 'newestFirst') {
            return b.objectBeginDate - a.objectBeginDate;
        }
    });

    return (
        <div>
            <Navbar />
            <SearchForm
                searchQuery={searchQuery}
                showInCollection={showInCollection}
                showHasImages={showHasImages}
                sortOrder={sortOrder}
                onSearch={handleSearch}
                onSearchQueryChange={(query) => setSearchQuery(query)}
                onFilterChange={(filterType, value) => {
                    if (filterType === 'showInCollection') {
                        setShowInCollection(value);
                    } else if (filterType === 'showHasImages') {
                        setShowHasImages(value);
                    }
                }}
                onSortChange={(value) => setSortOrder(value)}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.grid}>
                    {sortedResults.map((result, index) => (
                        <ObjectCard key={index} object={result} onImageClick={openModal} />
                    ))}
                </div>
            )}
            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                content={modalContent}
            />
        </div>
    );
};

export default Search;