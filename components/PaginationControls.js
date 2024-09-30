// components/PaginationControls.js

import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 2,
                mt: 2,
            }}
            role="navigation"
            aria-label="Pagination Controls"
        >
            <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Go to previous page"
            >
                Previous
            </Button>
            <Typography variant="body1" aria-live="polite">
                Page {currentPage} of {totalPages}
            </Typography>
            <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Go to next page"
            >
                Next
            </Button>
        </Box>
    );
};

export default PaginationControls;