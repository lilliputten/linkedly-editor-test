import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import classNames from 'classnames';

import { isDevBrowser } from 'src/core/constants/config';
import { showError } from 'src/ui/Basic';
import { getErrorText } from 'src/core/helpers/basic';
import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { AppSessionStore, useAppSessionStore } from 'src/store/AppSessionStore';
import { useAppDataStore } from 'src/store/AppDataStore';

import { HelpModal } from 'src/components/Help/HelpModal';
import { Demo } from 'src/components/Demo';
import { LoadDataPage } from 'src/components/LoadData/LoadDataPage';

import { AppRouterNavigatorWaiter } from './AppRouterNavigatorWaiter';

import styles from './AppRouterNavigator.module.scss';

/** DEBUG: Don't wait for user action */
const __debugEmulateDataReady = false && isDevBrowser;

// DEBUG: Unimplemented component stubs!
const PlaceholderComponent = (id: string) => () => (
  <Box className={classNames('AppRouterNavigatorPlaceholder', id)}>
    Placeholder component: <strong>{id}</strong>
  </Box>
);
const AppRouterNavigatorFinished = PlaceholderComponent('AppRouterNavigatorFinished');

type TAppRouterNavigatorProps = TPropsWithChildrenAndClassName;

interface TCurrentComponentProps extends TAppRouterNavigatorProps {
  sessionRootState: typeof AppSessionStore.prototype.rootState;
}

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
        console.error('[AppWrapper:useAppSessionStore]', errMsg, {
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
    // console.log('[AppRouterNavigator:loadNewData]');
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

/** Components router */
const RenderCurrentComponent: React.FC<TCurrentComponentProps> = (props) => {
  const { sessionRootState, children } = props;
  switch (sessionRootState) {
    case 'waiting':
      return <AppRouterNavigatorWaiter />;
    case 'demo':
      return <Demo />;
    case 'finished':
      return <AppRouterNavigatorFinished />;
    case 'loadData':
      return <LoadDataPage />;
    case 'ready':
      return <>{children}</>;
  }
};

/** Choose & render suitable application part */
const RenderContent: React.FC<TAppRouterNavigatorProps> = observer((props) => {
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

export const AppRouterNavigator: React.FC<TAppRouterNavigatorProps> = (props) => {
  const { className } = props;
  return (
    <Box className={classNames(className, styles.root)}>
      <RenderContent {...props} />
    </Box>
  );
};
