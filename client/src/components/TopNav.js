import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { IconButton, Badge,Typography } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';

import ThemeModeToggler from 'components/ThemeModeToggler';

const TopNav = () => {
  return (
    <Box>
      <IconButton color="primary" aria-label="heart">
        <Favorite />
      </IconButton>
      <IconButton color="primary" aria-label="cart">
        <Badge
          badgeContent={<Typography variant="caption">{3}</Typography>}
          color="error"
          sx={{ width: '5px', height: '5px' }}
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
      <ThemeModeToggler />
    </Box>
  );
};

TopNav.propTypes = {
  colorInvert: PropTypes.bool,
};

export default TopNav;
