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
import { TCampaignId, TCampaign, TCampaignNodeChangeParams } from 'src/entities/Campaign/types';
import { EditCampaignRoot } from 'src/components/Campaign/EditCampaign';
import { MainMenu } from 'src/components/Main/MainMenu';

import { LeftMenu } from 'src/components/App/LeftMenu';
import { MainEditCampaignPage } from 'src/pages/main/MainEditCampaignPage';

import styles from './MainEditCampaignPageLayout.module.scss';

export interface TMainEditCampaignPageLayoutProps extends TPropsWithClassName {}

export const MainEditCampaignPageLayout: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const routerParams = useParams();
  const campaignId: TCampaignId = Number(routerParams.campaignId);
  useCommonAppNavigation();
  const isLogged = useLogged();
  const [ready, setReady] = React.useState(false);
  const [campaignData, setCampaignData] = React.useState<TCampaign | undefined>();
  const [hasChanged, setHasChanged] = React.useState(false);
  React.useEffect(() => {
    if ((!campaignId || !isLogged) && !isDev) {
      return;
    }
    const url = `/api/campaign/${campaignId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCampaignData(data);
        setHasChanged(false);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, [isLogged, campaignId]);
  // TODO: Use data store
  const handleChange = React.useCallback((params: TCampaignNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal campaign sample', items: Array(1)}
      // nodeId, // 111
      // value, // [{…}]
      // valueId, // "items"
    } = params;
    setCampaignData(nodeData as TCampaign);
    setHasChanged(true);
  }, []);
  const hasData = ready && !!campaignData;
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
                        The campaign data has changed. Saving will be required.
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
          {!!campaignData && (
            <MainEditCampaignPage
              className={styles.rightPanelContent}
              handleChange={handleChange}
              campaignData={campaignData}
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
