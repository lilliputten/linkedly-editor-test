import React from 'react';
import classNames from 'classnames';
import { PageTitle } from 'src/components/MUI';

import { TCampaign } from 'src/entities/Campaign/types';
import { ViewCampaignPage } from 'src/components/Campaign/ViewCampaign/ViewCampaignPage';
import { CampaignNode, CampaignNodeFoldedContent } from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';

interface TViewCampaignProps {
  campaignData: TCampaign;
  className?: string;
}

export const ViewCampaignRoot: React.FC<TViewCampaignProps> = (props) => {
  const { campaignData, className } = props;
  const { id: campaignId, name, items } = campaignData;
  // Sort pages
  const sortedPages = useSortedCampaignItems(items);
  const title = name || `Campaign ${campaignId}`;
  return (
    <CampaignNode
      nodeType="root"
      nodeId={campaignId}
      className={classNames(className)}
      root
      spacing={2}
      // indent
    >
      <PageTitle>{title}</PageTitle>
      <CampaignNodeFoldedContent nodeBaseType="root-content" root>
        {/*
        <pre>{JSON.stringify(campaignData, null, 2)}</pre>
        */}
        {sortedPages.map((pageData) => {
          return <ViewCampaignPage key={pageData.pageId} pageData={pageData} />;
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
