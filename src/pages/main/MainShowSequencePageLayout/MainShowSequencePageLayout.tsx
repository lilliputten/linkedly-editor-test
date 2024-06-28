import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Box, Container, Stack, Typography } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSequenceId, TSequence } from 'src/entities/Sequence/types';

import { LeftMenu } from 'src/components/App/LeftMenu';
import { MainShowSequencePage } from 'src/pages/main/MainShowSequencePage';

import styles from './MainShowSequencePageLayout.module.scss';

export interface TMainShowSequencePageLayoutProps extends TPropsWithClassName {}

export const MainShowSequencePageLayout: React.FC<TPropsWithClassName> = observer((props) => {
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
            <MainShowSequencePage
              className={styles.rightPanelContent}
              // handleChange={handleChange}
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
