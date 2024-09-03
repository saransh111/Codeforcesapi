import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <ButtonGroup variant="outlined" color="primary" aria-label="outlined primary button group">
                {paginationNumbers.map((pageNumber) => (
                    <Button
                        onClick={() => handlePagination(pageNumber)}
                        key={pageNumber}
                        variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                        color={currentPage === pageNumber ? 'secondary' : 'primary'}
                        style={{
                            margin: '0 5px',
                            transition: 'background-color 0.3s ease, color 0.3s ease',
                            fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                        }}
                    >
                        {pageNumber}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default Pagination;
