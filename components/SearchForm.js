// components/SearchForm.js

import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormControlLabel, Switch, Select, MenuItem, Button, TextField, Stack } from '@mui/material';

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
    onPageChange,
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

    const handleFilterChange = (filterType, value) => {
        onFilterChange(filterType, value);
    };

    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    return (
        <Stack spacing={3}>
            <form onSubmit={handleSearch}>
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={(event) => onSearchQueryChange(event.target.value)}
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Filters</FormLabel>
                    <FormControlLabel
                        control={<Switch checked={showInCollection} onChange={(event) => handleFilterChange('showInCollection', event.target.checked)} />}
                        label="Include objects already in My Collection"
                    />
                    <FormControlLabel
                        control={<Switch checked={showHasImages} onChange={(event) => handleFilterChange('showHasImages', event.target.checked)} />}
                        label="Only show objects with images"
                    />
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <FormLabel id="sort-label">Sort by Age</FormLabel>
                    <Select
                        labelId="sort-label"
                        id="sort"
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort by Age"
                    >
                        <MenuItem value="oldestFirst">Oldest First</MenuItem>
                        <MenuItem value="newestFirst">Newest First</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <FormLabel id="results-per-page-label">Results per page</FormLabel>
                    <Select
                        labelId="results-per-page-label"
                        id="results-per-page"
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        label="Results per page"
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                    Previous
                </Button>
                <span>Page {currentPage}</span>
                <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
            </div>
        </Stack>
    );
};
export default SearchForm;