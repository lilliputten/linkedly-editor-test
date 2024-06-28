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

export interface TMainEditCampaignPageProps extends TPropsWithClassName {
  handleChange: (params: TCampaignNodeChangeParams) => void;
  campaignData: TCampaign;
}

export const MainEditCampaignPage: React.FC<TMainEditCampaignPageProps> = observer((props) => {
  const { className, handleChange, campaignData } = props;
  return (
    <Scrollable className={classNames(className, 'MainEditCampaignPage')}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        <EditCampaignRoot
          // prettier-ignore
          campaignData={campaignData}
          onChange={handleChange}
        />
      </Container>
    </Scrollable>
  );
});
