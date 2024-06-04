import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import { isDevBrowser } from 'src/core/constants/config';
// import { showError } from 'src/ui/Basic';
// import { getErrorText } from 'src/core/helpers/basic';
// import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { TSessionRootState, useAppSessionStore } from 'src/store/AppSessionStore';
import { demoRoute, loginRoute, mainRoute } from 'src/routes/appUrls';
import { makeRootUrl } from 'src/core/helpers/urls';

// NOTE: Should be wrapped by `obsrver` component

interface TStateMemo {
  sessionRootState: TSessionRootState | undefined;
}

export function useCommonAppNavigation() {
  const appSessionStore = useAppSessionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { rootState: sessionRootState } = appSessionStore;
  // prettier-ignore
  const stateMemo = React.useMemo<TStateMemo>(() => ({ sessionRootState: undefined }), []);
  // Navigate...
  React.useEffect(() => {
    /* // DEBUG
     * const oldSessionRootState = stateMemo.sessionRootState;
     * console.log('[WaitingPage:useAppNavigation:sessionRootState]', {
     *   pathname,
     *   oldSessionRootState,
     *   sessionRootState,
     * });
     */
    stateMemo.sessionRootState = sessionRootState;
    switch (sessionRootState) {
      case 'main': {
        const mainUrl = makeRootUrl(mainRoute);
        if (!pathname.startsWith(mainUrl)) {
          navigate(mainUrl);
        }
        break;
      }
      case 'demo': {
        navigate(makeRootUrl(demoRoute));
        break;
      }
      case 'login': {
        navigate(makeRootUrl(loginRoute));
        break;
      }
    }
  }, [sessionRootState, stateMemo, navigate, pathname]);
}
