import * as React from 'react';
import { Box, Button } from '@mui/material';

import { mediumLayoutTreshold } from 'src/core/constants/app';

import { TAppMenuItem } from '../../types/AppMenuTypes';

import styles from './AppMenu.module.scss';

interface TAppMenuProps {
  navItems: TAppMenuItem[];
  handleAppMenuClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export const AppMenu: React.FC<TAppMenuProps> = (props) => {
  const { navItems, handleAppMenuClick } = props;
  return (
    <Box
      sx={{ display: { xs: 'none', [mediumLayoutTreshold]: 'flex' } }}
      className={styles.navButtons}
    >
      {navItems.map((item) => (
        <Button
          key={item.id}
          id={item.id}
          sx={{ color: 'white' }}
          onClick={handleAppMenuClick}
          startIcon={item.icon && <item.icon />}
          title={item.title ? item.title : undefined}
          variant={item.selected ? 'outlined' : 'text'}
          color="secondary"
          disabled={item.disabled}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );
};
