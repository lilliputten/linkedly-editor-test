import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Stack } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSequenceId } from 'src/entities/Sequence/types';
import { ShowSequenceWrapper } from 'src/components/Sequence/ShowSequenceWrapper';
import { LeftMenu } from 'src/components/App/LeftMenu';
import { useAppDataStore } from 'src/store/AppDataStore';

import styles from './MainShowSequenceLayout.module.scss';
import { MainChartWrapper } from 'src/components/MainChart/MainChartWrapper';

export interface TMainShowSequenceLayoutProps extends TPropsWithClassName {}

export const MainShowSequenceLayout: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const sequenceId: TSequenceId = Number(routerParams.sequenceId);
  useCommonAppNavigation();
  const appDataStore = useAppDataStore();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if ((!sequenceId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/sequence/${sequenceId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // setSequenceData(data);
        appDataStore.setSequenceData(data);
        appDataStore.setHasSequenceDataChanged(false);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged, sequenceId, appDataStore]);
  return (
    <>
      <Stack className={classNames(className, styles.root)} direction="row" flex={1}>
        <LeftMenu className={styles.leftPanel} />
        <MainChartWrapper className={styles.mainPanel} />
        <Stack className={styles.rightPanel}>
          <ShowSequenceWrapper className={styles.rightPanelContent} />
        </Stack>
      </Stack>
      <ThemedLoaderSplash
        // prettier-ignore
        show={!ready}
        mode="cover"
        fullSize
      />
    </>
  );
});
