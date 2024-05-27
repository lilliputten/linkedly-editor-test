import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {
  HelpOutline,
  DarkMode,
  LightMode,
  Home,
  HowToReg,
  Visibility,
  Key,
  KeyOff,
} from '@mui/icons-material';

import { isDev } from 'src/core/constants/config';
import { useAppSessionStore } from 'src/store/AppSessionStore';

import { demoUrl } from 'src/routes/urls';

import { TAppMenuItem } from '../types/AppMenuTypes';

export function useAppMenuItems() {
  const location = useLocation();
  const { pathname } = location;
  const appSessionStore = useAppSessionStore();
  const { logged, themeMode, showHelp, useDemo } = appSessionStore;

  const isDark = themeMode === 'dark';
  const allowDemo = isDev || useDemo;
  const navItems = React.useMemo<TAppMenuItem[]>(() => {
    // prettier-ignore
    return [
      // TODO: Determine actual current app page (distinguish app and non-app pages)?
      { id: 'home', text: 'Home', icon: Home },
      !isDark && { id: 'setDarkTheme', text: 'Dark theme', icon: DarkMode, title:'Set dark theme' },
      isDark && { id: 'setLightTheme', text: 'Light theme', icon: LightMode, title:'Set light theme' },
      { id: 'showHelp', text: 'Help', icon: HelpOutline, title:'Show application help', selected: showHelp },
      allowDemo && { id: 'showDemo', text: 'Demo', icon: Visibility, title: 'Show demo', selected: pathname.startsWith(demoUrl) },
      logged && { id: 'signOut', text: 'Sign out', icon: KeyOff },
      !logged && { id: 'signIn', text: 'Sign in', icon: Key },
      !logged && { id: 'signUp', text: 'Sign up', icon: HowToReg, disabled: true },
    ].filter(Boolean) as TAppMenuItem[];
  }, [isDark, showHelp, allowDemo, pathname, logged]);
  return navItems;
}
