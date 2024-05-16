import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { IconButton, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { appTitle } from 'src/core/constants/config/app';
import { mediumLayoutTreshold, mobileLayoutTreshold } from 'src/core/constants/app';

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
        <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
          {appTitle}
        </Link>
      </Typography>
    </>
  );
};
