import * as React from 'react';
import { Box, Divider, Drawer, Typography } from '@mui/material';

import { appTitle } from 'src/core/constants/config/app';
import { RouterLink } from 'src/components/MUI';

import { layoutToolbarHeight, mediumLayoutTreshold } from 'src/core/constants/app';
import { drawerWidth, AppSideMenu, TAppMenuItem } from 'src/entities/AppMenu';

import styles from './AppDrawer.module.scss';

interface TAppDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  navItems: TAppMenuItem[];
  handleAppMenuClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export const AppDrawer: React.FC<TAppDrawerProps> = (props) => {
  const { mobileOpen, handleDrawerToggle, navItems, handleAppMenuClick } = props;
  const container = document.body;
  /** Mobile menu drawer */
  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', [mediumLayoutTreshold]: 'none' },
          // TODO: Move to style's module?
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography
            className={styles.drawTitle}
            variant="h6"
            sx={{ my: 2, height: layoutToolbarHeight }}
          >
            <RouterLink to="/" color="inherit" sx={{ textDecoration: 'none' }}>
              {appTitle}
            </RouterLink>
          </Typography>
          <Divider />
          <AppSideMenu navItems={navItems} handleAppMenuClick={handleAppMenuClick} />
        </Box>
      </Drawer>
    </nav>
  );
};
