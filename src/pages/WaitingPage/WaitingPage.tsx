import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';

// import { isDevBrowser } from 'src/core/constants/config';
// import { showError } from 'src/ui/Basic';
// import { getErrorText } from 'src/core/helpers/basic';
// import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { AppSessionStore, useAppSessionStore } from 'src/store/AppSessionStore';
import { loginUrl } from 'src/core/constants/app/urls';

type TSessionRootState = typeof AppSessionStore.prototype.rootState;

function useAppNavigation() {
  const appSessionStore = useAppSessionStore();
  const navigate = useNavigate();
  // const appDataStore = useAppDataStore();
  const { rootState: sessionRootState } = appSessionStore;
  interface TStateMemo {
    sessionRootState: TSessionRootState | undefined;
  }
  // prettier-ignore
  const stateMemo = React.useMemo<TStateMemo>(() => ({ sessionRootState: undefined }), []);
  // Navigate...
  React.useEffect(() => {
    // const oldSessionRootState = stateMemo.sessionRootState;
    // console.log('[WaitingPage:useAppNavigation] sessionRootState', {
    //   oldSessionRootState,
    //   sessionRootState,
    // });
    stateMemo.sessionRootState = sessionRootState;
    switch (sessionRootState) {
      // case 'help': {
      //   navigate(helpUrl);
      //   break;
      // }
      // case 'demo': {
      //   navigate(demoUrl);
      //   break;
      // }
      case 'login': {
        navigate(loginUrl);
        break;
      }
    }
  }, [sessionRootState, stateMemo, navigate]);
}

const WaitingPageLogic: React.FC = observer(() => {
  useAppNavigation();
  return (
    <FullScreenPageLayout>
      <p>WaitingPage</p>
    </FullScreenPageLayout>
  );
});

export const WaitingPage: React.FC = () => {
  return <WaitingPageLogic />;
};
