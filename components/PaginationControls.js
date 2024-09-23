// components/PaginationControls.js

import React from 'react';
import { Button } from '@mui/material';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </Button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </Button>
        </div>
    );
};

export default PaginationControls;