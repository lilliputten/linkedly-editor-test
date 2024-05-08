import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { isDevBrowser } from 'src/core/constants/config';
import { showError } from 'src/ui/Basic';
import { getErrorText } from 'src/core/helpers/basic';
import { useAppSessionStore } from 'src/store/AppSessionStore';
import { useAppDataStore } from 'src/store/AppDataStore';

import { LoginPage } from 'src/pages/LoginPage';
import { StartPage } from 'src/pages/StartPage';
import { TestPage } from 'src/pages/TestPage';
import { WaitingPage } from 'src/pages/WaitingPage';
import { DemoPage } from 'src/pages/DemoPage';
import { HelpPage } from 'src/pages/HelpPage';

/** DEBUG: Don't wait for user action */
const __debugEmulateDataReady = false && isDevBrowser;

/** Choose & render suitable application part * /
const RenderContent: React.FC<TAppRouterWrapperProps> = observer((props) => {
  useAppSessionInit();
  const appSessionStore: AppSessionStore = useAppSessionStore();
  const { rootState: sessionRootState } = appSessionStore;
  // TODO: Wrap with error & loader splash renderer?
  return (
    <>
      <RenderCurrentComponent
        // prettier-ignore
        sessionRootState={sessionRootState}
        {...props}
      />
      <HelpModal />
    </>
  );
});
*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <WaitingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/start',
    element: <StartPage />,
  },
  {
    path: '/demo',
    element: <DemoPage />,
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
  // TODO:
  // - demo
  // - finished
  // - ready
  // - loadData?
  // - help?
]);

function useAppSessionInit() {
  const appSessionStore = useAppSessionStore();
  const appDataStore = useAppDataStore();
  // Init session store...
  React.useEffect(() => {
    // Init options, parameters and settings...
    appSessionStore
      .initSettings()
      .then(() => {
        appSessionStore.setReady(true);
      })
      .catch((error) => {
        const errMsg = [
          // prettier-ignore
          'Cannot to initialize app session store settings',
          getErrorText(error),
        ]
          .filter(Boolean)
          .join(': ');
        const err = new Error(errMsg);
        // eslint-disable-next-line no-console
        console.error('[AppRouterWrapper:useAppSessionInit]', errMsg, {
          err,
          error,
        });
        // eslint-disable-next-line no-debugger
        debugger;
        showError(err);
        // throw error;
      });
  }, [appSessionStore]);
  // Init data store and provide data store link to session...
  React.useEffect(() => {
    // Set ready flag for demo mode. Otherwise it'll be set in `AppCoreStart` after data load
    if (__debugEmulateDataReady) {
      // TODO: Set demo data?
      appDataStore.setReady(true);
    }
    appSessionStore.setAppDataStore(appDataStore);
    return () => {
      appSessionStore.setAppDataStore(undefined);
    };
  }, [appDataStore, appSessionStore]);
  // Set load new data callback into the session store...
  const loadNewData = React.useCallback(() => {
    // console.log('[AppRouterWrapper:loadNewData]');
    appDataStore.setReady(false);
  }, [appDataStore]);
  React.useEffect(() => {
    // Set (and reset) handler for navigate to data load page...
    appSessionStore.setLoadNewDataCb(loadNewData);
    return () => {
      appSessionStore.setLoadNewDataCb(undefined);
    };
  }, [appDataStore, appSessionStore, loadNewData]);
}

const RenderRouter: React.FC = observer(() => {
  useAppSessionInit();
  return <RouterProvider router={router} />;
});

export const AppRouterWrapper: React.FC = () => {
  return <RenderRouter />;
};
