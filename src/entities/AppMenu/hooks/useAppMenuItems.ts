import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {
  HelpOutline,
  DarkMode,
  LightMode,
  BugReport,
  Home,
  Login,
  Logout,
} from '@mui/icons-material';

import { isDev } from 'src/core/constants/config';
import { useAppSessionStore } from 'src/store/AppSessionStore';

import { demoUrl } from 'src/routes/urls';

import { TAppMenuItem } from '../types/AppMenuTypes';

export function useAppMenuItems() {
  const location = useLocation();
  const { pathname } = location;
  // const appDataStore = useAppDataStore();
  const appSessionStore = useAppSessionStore();
  const {
    logged,
    themeMode,
    showHelp,
    useDemo,
    // rootState,
  } = appSessionStore;
  // const {
  //   // prettier-ignore
  //   hasAllData,
  // } = appDataStore;
  // const hasData = appDataStore?.ready && loadNewDataCb;
  const isDark = themeMode === 'dark';
  const allowDemo = isDev || useDemo;
  const navItems = React.useMemo<TAppMenuItem[]>(() => {
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
    ].filter(Boolean) as TAppMenuItem[];
  }, [isDark, showHelp, allowDemo, pathname, logged]);
  return navItems;
}
