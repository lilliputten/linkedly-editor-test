import React from 'react';
import { useNavigate } from 'react-router-dom';

// import { isDevBrowser } from 'src/core/constants/config';
// import { showError } from 'src/ui/Basic';
// import { getErrorText } from 'src/core/helpers/basic';
// import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { TSessionRootState, useAppSessionStore } from 'src/store/AppSessionStore';
import { demoUrl, loginUrl, mainUrl } from 'src/routes/urls';

// NOTE: Should be wrapped by `obsrver` component

export function useCommonAppNavigation() {
  const appSessionStore = useAppSessionStore();
  const navigate = useNavigate();
  const { rootState: sessionRootState } = appSessionStore;
  interface TStateMemo {
    sessionRootState: TSessionRootState | undefined;
  }
  // prettier-ignore
  const stateMemo = React.useMemo<TStateMemo>(() => ({ sessionRootState: undefined }), []);
  // Navigate...
  React.useEffect(() => {
    // const oldSessionRootState = stateMemo.sessionRootState;
    // console.log('[WaitingPage:useAppNavigation:sessionRootState]', {
    //   oldSessionRootState,
    //   sessionRootState,
    // });
    stateMemo.sessionRootState = sessionRootState;
    switch (sessionRootState) {
      // case 'help': {
      //   navigate(helpUrl);
      //   break;
      // }
      case 'main': {
        navigate(mainUrl);
        break;
      }
      case 'demo': {
        navigate(demoUrl);
        break;
      }
      case 'login': {
        navigate(loginUrl);
        break;
      }
    }
  }, [sessionRootState, stateMemo, navigate]);
}
