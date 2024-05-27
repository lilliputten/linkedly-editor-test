import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSessionStore } from 'src/store/AppSessionStore';

import { demoUrl, loginUrl } from 'src/routes/urls';

export function useHandleAppMenuClick() {
  const navigate = useNavigate();
  const appSessionStore = useAppSessionStore();
  /** Handle user action... */
  const handleAppMenuClick = React.useCallback<
    React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  >(
    (ev) => {
      const { currentTarget } = ev;
      const { id } = currentTarget;
      switch (id) {
        /* // UNUSED: Old session and data actions
         * case 'visualize': {
         *   // TODO: Navigate to main app screen...
         *   appSessionStore.setShowDemo(false);
         *   appSessionStore.setShowHelp(false);
         *   appDataStore.setReady(true);
         *   break;
         * }
         * case 'loadData': {
         *   // appSessionStore.setShowDemo(false);
         *   // appSessionStore.setShowHelp(false);
         *   // appSessionStore.setReady(true);
         *   // if (loadNewDataCb) {
         *   //   loadNewDataCb();
         *   // }
         *   navigate(loginUrl);
         *   break;
         * }
         */
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
        case 'signIn': {
          navigate(loginUrl);
          break;
        }
        case 'signOut': {
          appSessionStore.setLogged(false);
          navigate(loginUrl);
          break;
        }
      }
    },
    [appSessionStore, navigate],
  );
  return handleAppMenuClick;
}
