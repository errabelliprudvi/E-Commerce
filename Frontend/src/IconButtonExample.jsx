import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function IconButtonExample() {
  return (
    <Button variant="contained" color="primary" startIcon={<AddIcon />}>
      Add Item
    </Button>
  );
}

export default IconButtonExample;
