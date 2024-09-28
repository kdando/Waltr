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
    fromYear,
    toYear,
    onYearChange,
}) => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch();
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
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Typography variant="body1" sx={{ mr: 2 }}>Search for objects from</Typography>
                                <TextField
                                    type="number"
                                    value={fromYear}
                                    onChange={(e) => onYearChange('from', e.target.value)}
                                    placeholder="Year"
                                    inputProps={{ min: -200000, max: new Date().getFullYear() }}
                                    sx={{ width: 100, mr: 2 }}
                                />
                                <Typography variant="body1" sx={{ mr: 2 }}>to</Typography>
                                <TextField
                                    type="number"
                                    value={toYear}
                                    onChange={(e) => onYearChange('to', e.target.value)}
                                    placeholder="Year"
                                    inputProps={{ min: -200000, max: new Date().getFullYear() }}
                                    sx={{ width: 100 }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Collapse>
            </Box>
        </Stack>
    );
};

export default SearchForm;