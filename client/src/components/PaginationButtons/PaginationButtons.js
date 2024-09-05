import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = ({ count, page, onPageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationButtons;
