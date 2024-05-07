import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
import { LoaderSplash } from 'src/ui/Basic';
import { useAppSessionStore } from 'src/store';

type TAppRouterNavigatorWaiterProps = TPropsWithClassName;

export const AppRouterNavigatorWaiter: React.FC<TAppRouterNavigatorWaiterProps> = observer((props) => {
  const { className } = props;
  const appSessionStore = useAppSessionStore();
  const { themeMode } = appSessionStore;
  return (
    <Box className={classNames(className, 'AppRouterNavigatorWaiter')}>
      <LoaderSplash show mode="cover" fullSize themeMode={themeMode} />
    </Box>
  );
});
