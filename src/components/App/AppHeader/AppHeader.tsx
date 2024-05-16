import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { AppBar, Toolbar } from '@mui/material';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
import { layoutToolbarHeight, mediumLayoutTreshold } from 'src/core/constants/app';
import { AppMenu, useAppMenuItems, useHandleAppMenuClick } from 'src/entities/AppMenu';
import { AppTitleBlock } from 'src/components/App/AppTitleBlock/AppTitleBlock';
import { AppDrawer } from 'src/components/App/AppDrawer';

import styles from './AppHeader.module.scss';

export const AppHeader: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const navItems = useAppMenuItems();
  /** Mobile drawer state */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /** Toggle mobile drawer... */
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);
  /** Handle user action... */
  const handleAppMenuClick = useHandleAppMenuClick();

  return (
    <>
      <AppBar className={classNames(className, styles.root)} component="nav">
        <Toolbar
          sx={{
            minHeight: { xs: layoutToolbarHeight, [mediumLayoutTreshold]: layoutToolbarHeight },
          }}
        >
          <AppTitleBlock mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <AppMenu navItems={navItems} handleAppMenuClick={handleAppMenuClick} />
        </Toolbar>
      </AppBar>
      <AppDrawer
        navItems={navItems}
        handleAppMenuClick={handleAppMenuClick}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </>
  );
});
