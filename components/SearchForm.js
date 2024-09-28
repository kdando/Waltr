import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormControlLabel, Switch, Select, MenuItem, Button, TextField, Stack, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

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
    useEffect(() => {
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage);
    }, [currentPage, resultsPerPage]);

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage);
    };

    const handleResultsPerPageChange = (event) => {
        const newResultsPerPage = parseInt(event.target.value, 10);
        setResultsPerPage(newResultsPerPage);
        onResultsPerPageChange(newResultsPerPage);
        onPageChange(1);
    };

    const handleFilterChange = (filterType, value) => {
        onFilterChange(filterType, value);
        if (filterType === 'showHasImages') {
            // Launch a new search when showHasImages changes
            onSearch(searchQuery, showInCollection, value, sortOrder, resultsPerPage, 1);
        }
    };

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value;
        onSortChange(newSortOrder);
        // Launch a new search when sortOrder changes
        onSearch(searchQuery, showInCollection, showHasImages, newSortOrder, resultsPerPage, 1);
    };


    return (
        <Stack spacing={4}>
            {/* Search Bar and Button */}
            <form onSubmit={handleSearch}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <TextField
                        label="Search"
                        value={searchQuery}
                        onChange={(event) => onSearchQueryChange(event.target.value)}
                        variant="outlined"
                        sx={{ flex: 4, marginRight: 1 }} // Takes up 4/5 of the space
                        aria-label="Search query"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ flex: 1 }} aria-label="Search">
                        Search
                    </Button>
                </Box>
            </form>

            {/* Filters and Sort Options */}
            <Grid container spacing={2} justifyContent="center">
                <Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showInCollection}
                                onChange={(event) => handleFilterChange('showInCollection', event.target.checked)}
                                aria-label="Show objects already in My Collection"
                            />
                        }
                        label="Show objects already in My Collection"
                    />
                </Grid>
                <Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showHasImages}
                                onChange={(event) => handleFilterChange('showHasImages', event.target.checked)}
                                aria-label="Only show objects with images"
                            />
                        }
                        label="Only show objects with images"
                    />
                </Grid>
                <Grid>
                    <FormControl sx={{ minWidth: 120 }}>
                        <FormLabel id="sort-label">Sort by Age</FormLabel>
                        <Select
                            labelId="sort-label"
                            id="sort"
                            value={sortOrder}
                            onChange={handleSortChange}
                            label="Sort by Age"
                            aria-label="Sort by Age"
                        >
                            <MenuItem value="oldestFirst">Oldest First</MenuItem>
                            <MenuItem value="newestFirst">Newest First</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    <FormControl sx={{ minWidth: 120 }}>
                        <FormLabel id="results-per-page-label">Max results shown per page</FormLabel>
                        <Select
                            labelId="results-per-page-label"
                            id="results-per-page"
                            value={resultsPerPage}
                            onChange={handleResultsPerPageChange}
                            label="Results per page"
                            aria-label="Max results per page"
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default SearchForm;
