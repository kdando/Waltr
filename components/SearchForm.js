// components/SearchForm.js

import React from 'react';
import styles from '../styles/Search.module.css';

const SearchForm = ({ searchQuery, showInCollection, showHasImages, sortOrder, onSearch, onSearchQueryChange, onFilterChange, onSortChange }) => {
    const handleSearch = async (event) => {
        event.preventDefault();
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder);
    };

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
            </div>
        </div>
    );
};

export default SearchForm;
