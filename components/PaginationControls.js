// components/PaginationControls.js

import React from 'react';
import { Button } from '@mui/material';

const PaginationControls = ({ currentPage, onPageChange }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </Button>
            <span>Page {currentPage}</span>
            <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
        </div>
    );
};

export default PaginationControls;