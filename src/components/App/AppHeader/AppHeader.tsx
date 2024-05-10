import * as React from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Link from '@mui/material/Link';
import {
  AppBar,
  Box,
  Breakpoint,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu,
  HelpOutline,
  // DriveFolderUpload,
  DarkMode,
  LightMode,
  BugReport,
  // BarChart,
  SvgIconComponent,
  Home,
  Login,
  Logout,
} from '@mui/icons-material';
import classNames from 'classnames';

import { isDev } from 'src/core/constants/config';
import { TPropsWithClassName } from 'src/core/types';
import { appTitle } from 'src/core/constants/config/app';
import { useAppSessionStore } from 'src/store/AppSessionStore';
// import { useAppDataStore } from 'src/store/AppDataStore';

import styles from './AppHeader.module.scss';
import { demoUrl, loginUrl } from 'src/routes/urls';

/** The width of mobile menu drawer */
const drawerWidth = 280;

interface TNavItem {
  icon?: SvgIconComponent;
  id: string;
  text: string;
  title?: string;
  selected?: boolean;
}

export const AppHeader: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const container = document.body;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  // const appDataStore = useAppDataStore();
  const appSessionStore = useAppSessionStore();
  const {
    logged,
    themeMode,
    // showDemo,
    showHelp,
    useDemo,
    // rootState,
  } = appSessionStore;
  // const { rootState: sessionRootState } = appSessionStore;
  // const {
  //   // prettier-ignore
  //   hasAllData,
  // } = appDataStore;
  // const hasData = false; // appDataStore?.ready && loadNewDataCb;
  const isDark = themeMode === 'dark';
  const allowDemo = isDev || useDemo;
  // TODO: Check current page
  const navItems = React.useMemo<TNavItem[]>(() => {
    // prettier-ignore
    return [
      // TODO: Determine actual current app page (distinguish app and non-app pages)?
      { id: 'home', text: 'Home', icon: Home },
      // hasAllData && { id: 'visualize', text: 'Visualize', icon: BarChart, title:'Show data', selected: rootState === 'ready' },
      // hasData && { id: 'loadData', text: 'Load new data', icon: DriveFolderUpload, title:'Reload data', selected: rootState === 'loadData' },
      // !hasData && { id: 'loadData', text: 'Load data', icon: DriveFolderUpload, title:'Load data', selected: rootState === 'loadData' },
      !isDark && { id: 'setDarkTheme', text: 'Dark theme', icon: DarkMode, title:'Set dark theme' },
      isDark && { id: 'setLightTheme', text: 'Light theme', icon: LightMode, title:'Set light theme' },
      { id: 'showHelp', text: 'Help', icon: HelpOutline, title:'Show application help', selected: showHelp },
      allowDemo && { id: 'showDemo', text: 'Demo', icon: BugReport, title: 'Show demo', selected: pathname.startsWith(demoUrl) },
      // allowDemo && !showDemo && { id: 'showDemo', text: 'Demo', icon: BugReport, title: 'Show demo' },
      // allowDemo && showDemo && { id: 'closeDemo', text: 'Close demo', icon: BugReport, title: 'Hide demo' },
      // TODO: Add logout item
      logged && { id: 'logOut', text: 'Log out', icon: Logout },
      !logged && { id: 'logIn', text: 'Log in', icon: Login },
    ].filter(Boolean) as TNavItem[];
  }, [isDark, showHelp, allowDemo, pathname, logged]);
  /** Mobile drawer state */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /** Toggle mobile drawer... */
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);
  /** Handle user action... */
  const handleNavItemClick = React.useCallback<
    React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  >(
    (ev) => {
      const { currentTarget } = ev;
      const { id } = currentTarget;
      switch (id) {
        // case 'visualize': {
        //   // TODO: Navigate to main app screen...
        //   appSessionStore.setShowDemo(false);
        //   appSessionStore.setShowHelp(false);
        //   appDataStore.setReady(true);
        //   break;
        // }
        // case 'loadData': {
        //   // appSessionStore.setShowDemo(false);
        //   // appSessionStore.setShowHelp(false);
        //   // appSessionStore.setReady(true);
        //   // if (loadNewDataCb) {
        //   //   loadNewDataCb();
        //   // }
        //   navigate(loginUrl);
        //   break;
        // }
        case 'home': {
          navigate('/');
          break;
        }
        case 'setLightTheme': {
          appSessionStore.setThemeMode('light');
          break;
        }
        case 'setDarkTheme': {
          appSessionStore.setThemeMode('dark');
          break;
        }
        case 'showHelp': {
          appSessionStore.setShowHelp(true);
          // navigate(helpUrl);
          break;
        }
        case 'hideHelp': {
          appSessionStore.setShowHelp(false);
          break;
        }
        case 'showDemo': {
          navigate(demoUrl);
          // appSessionStore.setShowDemo(true);
          break;
        }
        case 'logIn': {
          navigate(loginUrl);
          break;
        }
        case 'logOut': {
          appSessionStore.setLogged(false);
          navigate(loginUrl);
          break;
        }
      }
    },
    [appSessionStore, navigate],
  );

  // Adaptive breakpoints...
  const treshold: Breakpoint = 'md';
  const midTreshold: Breakpoint = 'sm';

  // Toolbar height...
  const toolbarHeight = 48;

  // TODO: Show other menu items for mobile mode...
  const drawer = React.useMemo(() => {
    return (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography className={styles.drawTitle} variant="h6" sx={{ my: 2, height: toolbarHeight }}>
          <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
            {appTitle}
          </Link>
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding title={item.title ? item.title : undefined}>
              <ListItemButton id={item.id} onClick={handleNavItemClick} selected={item.selected}>
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
      </Box>
    );
  }, [handleDrawerToggle, handleNavItemClick, navItems]);

  return (
    <>
      <AppBar className={classNames(className, styles.root)} component="nav">
        <Toolbar sx={{ minHeight: { xs: toolbarHeight, [treshold]: toolbarHeight } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { [treshold]: 'none' } }}
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
                [midTreshold]: mobileOpen ? 'none' : 'block',
                [treshold]: 'block',
              },
            }}
          >
            {/* TODO: Show logo */}
            <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
              {appTitle}
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', [treshold]: 'flex' } }} className={styles.navButtons}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                id={item.id}
                sx={{ color: 'white' }}
                onClick={handleNavItemClick}
                startIcon={item.icon && <item.icon />}
                title={item.title ? item.title : undefined}
                variant={item.selected ? 'outlined' : 'text'}
                color="secondary"
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
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
            display: { xs: 'block', [treshold]: 'none' },
            // TODO: Move to style's module
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
});
