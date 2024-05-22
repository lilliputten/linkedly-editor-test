import * as React from 'react';

import { IconButton, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { appTitle } from 'src/core/constants/config/app';
import { mediumLayoutTreshold, mobileLayoutTreshold } from 'src/core/constants/app';
import { RouterLink } from 'src/components/MUI';

import styles from './AppTitleBlock.module.scss';

interface TAppTitleBlockProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

export const AppTitleBlock: React.FC<TAppTitleBlockProps> = (props) => {
  const { handleDrawerToggle, mobileOpen } = props;
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { [mediumLayoutTreshold]: 'none' } }}
      >
        <Menu />
      </IconButton>
      <Typography
        className={styles.appTitle}
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          display: {
            xs: 'none',
            [mobileLayoutTreshold]: mobileOpen ? 'none' : 'block',
            [mediumLayoutTreshold]: 'block',
          },
        }}
      >
        {/* TODO: Show logo */}
        <RouterLink to="/" color="inherit" sx={{ textDecoration: 'none' }}>
          {appTitle}
        </RouterLink>
      </Typography>
    </>
  );
};
