import React, { useEffect } from 'react';
import { FormControl, FormLabel, FormControlLabel, Switch, Select, MenuItem, Button, TextField, Stack, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'

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
    };

    const handleSortChange = (event) => {
        onSortChange(event.target.value);
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
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ flex: 1 }}>
                        Search
                    </Button>
                </Box>
            </form>

            {/* Filters and Sort Options */}
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showInCollection}
                                onChange={(event) => handleFilterChange('showInCollection', event.target.checked)}
                            />
                        }
                        label="Include objects already in My Collection"
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showHasImages}
                                onChange={(event) => handleFilterChange('showHasImages', event.target.checked)}
                            />
                        }
                        label="Only show objects with images"
                    />
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
                    <FormControl sx={{ minWidth: 120 }}>
                        <FormLabel id="results-per-page-label">Max results per page</FormLabel>
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
                </Grid>
            </Grid>
        </Stack>
    );
};

export default SearchForm;
