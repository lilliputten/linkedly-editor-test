import React from 'react';
import classNames from 'classnames';
import { PageTitle } from 'src/components/MUI';

import { TCampaign } from 'src/entities/Campaign/types';
import { ViewCampaignPage } from 'src/components/Campaign/ViewCampaign/ViewCampaignPage';
import { CampaignNode, CampaignNodeFoldedContent } from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';

interface TViewCampaignProps {
  surveyData: TCampaign;
  className?: string;
}

export const ViewCampaignRoot: React.FC<TViewCampaignProps> = (props) => {
  const { surveyData, className } = props;
  const { id: surveyId, name, items } = surveyData;
  // Sort pages
  const sortedPages = useSortedCampaignItems(items);
  const title = name || `Campaign ${surveyId}`;
  return (
    <CampaignNode
      nodeType="root"
      nodeId={surveyId}
      className={classNames(className)}
      root
      spacing={2}
      // indent
    >
      <PageTitle>{title}</PageTitle>
      <CampaignNodeFoldedContent nodeBaseType="root-content" root>
        {/*
        <pre>{JSON.stringify(surveyData, null, 2)}</pre>
        */}
        {sortedPages.map((pageData) => {
          return <ViewCampaignPage key={pageData.pageId} pageData={pageData} />;
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
