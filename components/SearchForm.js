import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, FormControlLabel, Switch, Select, MenuItem, Button, TextField, Stack, Box, Tooltip, Collapse, IconButton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SearchForm = ({
    searchQuery,
    showInCollection,
    showHasImages,
    sortOrder,
    searchByCultureOrPlace,
    setSearchByCultureOrPlace,
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
    const [showMoreOptions, setShowMoreOptions] = useState(false);


    useEffect(() => {
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, resultsPerPage, currentPage, searchByCultureOrPlace);
    }, [currentPage, resultsPerPage, searchByCultureOrPlace]);

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchQuery, showInCollection, showHasImages, sortOrder, searchByCultureOrPlace, resultsPerPage, currentPage, searchByCultureOrPlace);
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
            onSearch(searchQuery, showInCollection, value, sortOrder, resultsPerPage, 1, searchByCultureOrPlace);
        }
    };

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value;
        onSortChange(newSortOrder);
        onSearch(searchQuery, showInCollection, showHasImages, newSortOrder, resultsPerPage, 1, searchByCultureOrPlace);
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
                        sx={{ flex: 4, marginRight: 1 }}
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
                    <Tooltip
                        title="Due to rights issues, for some objects images may be present but not viewable here. Click through to More Details on the object card to see more."
                        disableInteractive
                        enterTouchDelay={0}
                        leaveTouchDelay={5000}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showHasImages}
                                    onChange={(event) => handleFilterChange('showHasImages', event.target.checked)}
                                    aria-label="Only show objects with images"
                                    aria-describedby="tooltip-images"
                                />
                            }
                            label="Only show objects with images"
                        />
                    </Tooltip>
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

            {/* Expandable Section for More Search Options */}
            <Box>
                <Typography variant="h6" component="h2" onClick={() => setShowMoreOptions(!showMoreOptions)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    More Search Options
                    <IconButton aria-label="expand more" size="small">
                        <ExpandMoreIcon sx={{ transform: showMoreOptions ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </IconButton>
                </Typography>
                <Collapse in={showMoreOptions}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={searchByCultureOrPlace}
                                        onChange={(event) => setSearchByCultureOrPlace(event.target.checked)}
                                        aria-label="Search for a culture or place of origin"
                                    />
                                }
                                label="Search for a culture or place of origin"
                            />
                        </Grid>
                    </Grid>
                </Collapse>
            </Box>
        </Stack>
    );
};

export default SearchForm;
