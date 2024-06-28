import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Box, Container, Typography } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TCampaignId, TCampaign, TCampaignNodeChangeParams } from 'src/entities/Campaign/types';
import { EditCampaignRoot } from 'src/components/Campaign/EditCampaign';

export const MainEditCampaignPage: React.FC<TPropsWithClassName> = observer((props) => {
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

  /* // DEMO: Dummy list
   * const itemsCount = 1;
   * const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
   */
  return (
    <>
      <Scrollable className={classNames(className, 'MainEditCampaignPage')}>
        <Container maxWidth="md" sx={{ my: 2 }}>
          {hasChanged && (
            <Box>
              <Typography color="red">
                {/* Notification about data change */}
                The campaign data has changed. Saving will be required.
              </Typography>
            </Box>
          )}
          {ready && !!campaignData && (
            <EditCampaignRoot
              // prettier-ignore
              campaignData={campaignData}
              onChange={handleChange}
            />
          )}
        </Container>
      </Scrollable>
      <ThemedLoaderSplash
        // prettier-ignore
        show={!ready}
        mode="cover"
        fullSize
      />
    </>
  );
});
