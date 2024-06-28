import React from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Box, Container, Stack, Typography } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSequenceId, TSequence, TSequenceNodeChangeParams } from 'src/entities/Sequence/types';
import { EditSequenceRoot } from 'src/components/Sequence/EditSequence';
import { MainMenu } from 'src/components/Main/MainMenu';

import { LeftMenu } from 'src/components/App/LeftMenu';
import { MainEditSequencePage } from 'src/pages/main/MainEditSequencePage';

import styles from './MainEditSequencePageLayout.module.scss';

export interface TMainEditSequencePageLayoutProps extends TPropsWithClassName {}

export const MainEditSequencePageLayout: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const sequenceId: TSequenceId = Number(routerParams.sequenceId);
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [sequenceData, setSequenceData] = React.useState<TSequence | undefined>();
  const [hasChanged, setHasChanged] = React.useState(false);
  React.useEffect(() => {
    if ((!sequenceId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/sequence/${sequenceId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSequenceData(data);
        setHasChanged(false);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged, sequenceId]);
  // TODO: Use data store
  const handleChange = React.useCallback((params: TSequenceNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal sequence sample', items: Array(1)}
      // nodeId, // 111
      // value, // [{…}]
      // valueId, // "items"
    } = params;
    setSequenceData(nodeData as TSequence);
    setHasChanged(true);
  }, []);
  const hasData = ready && !!sequenceData;
  return (
    <>
      <Stack className={classNames(className, styles.root)} direction="row" flex={1}>
        <LeftMenu className={styles.leftPanel} />
        <Stack className={styles.mainPanel}>
          <Scrollable className={styles.mainScrollable}>
            <Container maxWidth="md" sx={{ my: 2 }}>
              {hasData && (
                <>
                  {hasChanged && (
                    <Box>
                      <Typography color="red">
                        {/* Notification about data change */}
                        The sequence data has changed. Saving will be required.
                      </Typography>
                    </Box>
                  )}
                  <>Main content</>
                </>
              )}
            </Container>
          </Scrollable>
        </Stack>
        <Stack className={styles.rightPanel}>
          {!!sequenceData && (
            <MainEditSequencePage
              className={styles.rightPanelContent}
              handleChange={handleChange}
              sequenceData={sequenceData}
            />
          )}
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
