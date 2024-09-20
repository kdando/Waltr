// components/SearchForm.js

import React, { useEffect } from 'react';
import styles from '../styles/Search.module.css';

const SearchForm = ({
    searchQuery,
    showInCollection,
    showHasImages,
    sortOrder,
    onSearch,
    onSearchQueryChange,
    onFilterChange,
    onSortChange,
    resultsPerPage,
    setResultsPerPage,
    onResultsPerPageChange,
    currentPage,
    onPageChange
}) => {



    const handleSearch = async (event) => {
        event.preventDefault();
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage);
    };

    const handleResultsPerPageChange = (event) => {
        const newResultsPerPage = parseInt(event.target.value, 10);
        setResultsPerPage(newResultsPerPage);
        onResultsPerPageChange(newResultsPerPage);
        onPageChange(1);
    };

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    useEffect(() => {
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage);
    }, [currentPage, resultsPerPage]);

    const handleFilterChange = (event, filterType) => {
        const value = event.target.checked;
        onFilterChange(filterType, value);
    };

    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => onSearchQueryChange(event.target.value)}
                    placeholder="Search"
                />
                <button type="submit">Search</button>
            </form>
            <div className={styles.filters}>
                <label>
                    <input
                        type="checkbox"
                        checked={showInCollection}
                        onChange={(event) => handleFilterChange(event, 'showInCollection')}
                    />
                    Include objects already in My Collection
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showHasImages}
                        onChange={(event) => handleFilterChange(event, 'showHasImages')}
                    />
                    Only show objects with images
                </label>
                <label>
                    Sort by Age:
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="oldestFirst">Oldest First</option>
                        <option value="newestFirst">Newest First</option>
                    </select>
                </label>
                <label>
                    Results per page:
                    <select value={resultsPerPage} onChange={handleResultsPerPageChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default SearchForm;