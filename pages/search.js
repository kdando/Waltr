// pages/search.js

import styles from '../styles/Search.module.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import ObjectCard from '../components/ObjectCard';
import Navbar from '../components/Navbar';
import CustomModal from '../components/Modal';
import SearchForm from '../components/SearchForm';
import PaginationControls from '../components/PaginationControls';
import { CollectionContext } from '../contexts/CollectionContext';
import { useLoading } from '../contexts/LoadingContext';
import Loading from '../components/Loading';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { isLoading, setIsLoading } = useLoading();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("")
    const [searchQuery, setSearchQuery] = useState('');
    const [showInCollection, setShowInCollection] = useState(true);
    const [showHasImages, setShowHasImages] = useState(true);
    const [sortOrder, setSortOrder] = useState('oldestFirst');
    const { collection } = useContext(CollectionContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const handleSearch = async (query, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/search`, {
                params: {
                    query,
                    showInCollection,
                    showHasImages,
                    sortOrder,
                    resultsPerPage,
                    currentPage
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
        handleSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, page);
    };

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
                onResultsPerPageChange={(value) => setResultsPerPage(value)}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
            {isLoading ? <Loading /> : <div className={styles.grid}>{sortedResults.map((result, index) => (<ObjectCard key={index} object={result} onImageClick={openModal} />))}</div>}
            <PaginationControls
                currentPage={currentPage}
                totalPages={Math.ceil(searchResults.length / resultsPerPage)}
                onPageChange={handlePageChange}
            />
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} content={modalContent} />
        </div>
    );
};

export default Search;  