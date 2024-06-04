import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSessionStore } from 'src/store/AppSessionStore';

import { demoRoute, loginRoute, rootUrl } from 'src/routes/appUrls';
import { makeRootUrl } from 'src/core/helpers/urls';

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
        case 'home': {
          navigate(makeRootUrl(rootUrl));
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
          break;
        }
        case 'hideHelp': {
          appSessionStore.setShowHelp(false);
          break;
        }
        case 'showDemo': {
          navigate(makeRootUrl(demoRoute));
          break;
        }
        case 'signIn': {
          navigate(makeRootUrl(loginRoute));
          break;
        }
        case 'signOut': {
          appSessionStore.setLogged(false);
          navigate(makeRootUrl(loginRoute));
          break;
        }
      }
    },
    [appSessionStore, navigate],
  );
  return handleAppMenuClick;
}
