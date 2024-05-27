import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { TAppMenuItem } from '../../types/AppMenuTypes';

import styles from './AppSideMenu.module.scss';

interface TAppSideMenuProps {
  navItems: TAppMenuItem[];
  handleAppMenuClick: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

export const AppSideMenu: React.FC<TAppSideMenuProps> = (props) => {
  const { navItems, handleAppMenuClick } = props;
  // TODO: Show other menu items for mobile mode...
  return (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.id} disablePadding title={item.title ? item.title : undefined}>
          <ListItemButton
            id={item.id}
            onClick={handleAppMenuClick}
            selected={item.selected}
            disabled={item.disabled}
          >
            {item.icon && (
              <ListItemIcon className={styles.ListItemIcon}>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
