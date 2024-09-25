import React, { useState, useContext } from 'react';
import axios from 'axios';
import ObjectCard from '../components/ObjectCard';
import CustomModal from '../components/Modal';
import SearchForm from '../components/SearchForm';
import PaginationControls from '../components/PaginationControls';
import { CollectionContext } from '../contexts/CollectionContext';
import { useLoading } from '../contexts/LoadingContext';
import Loading from '../components/Loading';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2'

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { isLoading, setIsLoading } = useLoading();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [showInCollection, setShowInCollection] = useState(true);
    const [showHasImages, setShowHasImages] = useState(false);
    const [sortOrder, setSortOrder] = useState('oldestFirst');
    const { collection } = useContext(CollectionContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const handleSearch = async () => {
        if (!searchQuery) return; // Prevent search if query is empty

        setIsLoading(true);
        try {
            const response = await axios.get(`/api/search`, {
                params: {
                    searchTerm: searchQuery,
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
        return 0; // Return 0 if sortOrder is not recognized
    });

    return (
        <Box sx={{ py: 4 }}>
            {/* Search Form */}
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

            {/* Loading Spinner */}
            {isLoading ? (
                <Loading />
            ) : (
                <Box>
                    {/* Pagination Controls (Top) */}
                    <PaginationControls
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />

                    {/* Search Results Grid */}
                    <Grid container spacing={3} sx={{ mt: 3 }}>
                        {sortedResults.length > 0 ? (
                            sortedResults.map((result, index) => (
                                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                    <ObjectCard object={result} onImageClick={openModal} />
                                </Grid>
                            ))
                        ) : (
                            <p>Try searching for something!</p> // Message if no results
                        )}
                    </Grid>

                    {/* Pagination Controls (Bottom) */}
                    <PaginationControls
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </Box>
            )}

            {/* Modal */}
            <CustomModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                content={modalContent}
            />
        </Box>
    );
};

export default Search;
