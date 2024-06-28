import React from 'react';
import classNames from 'classnames';

import { TCampaignPage } from 'src/entities/Campaign/types';
import { ViewCampaignSection } from 'src/components/Campaign/ViewCampaign/ViewCampaignSection';
import { CampaignNode, CampaignNodeFoldedContent } from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';

interface TViewCampaignPageProps {
  pageData: TCampaignPage;
  className?: string;
}

export const ViewCampaignPage: React.FC<TViewCampaignPageProps> = (props) => {
  const { pageData, className } = props;
  const { pageId, items } = pageData;
  // Sort sections
  const sortedSections = useSortedCampaignItems(items);
  return (
    <CampaignNode
      nodeType="page"
      nodeId={pageId}
      className={classNames(className)}
      // data-page-id={String(pageId)}
    >
      <CampaignNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={pageId}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />

      <CampaignNodeFoldedContent nodeBaseType="page-content" indent>
        {/*
        <pre>{JSON.stringify(sections, null, 2)}</pre>
        */}
        {sortedSections.map((sectionData) => {
          return <ViewCampaignSection key={sectionData.sectionId} sectionData={sectionData} />;
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
