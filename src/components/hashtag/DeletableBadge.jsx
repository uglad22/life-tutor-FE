import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const DeletableBadge = ({ children }) => {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
    
      return (
        <Stack direction="row" spacing={1}>
          <Chip label={ children } onDelete={handleDelete} />
        </Stack>
      );
}

export default DeletableBadge;