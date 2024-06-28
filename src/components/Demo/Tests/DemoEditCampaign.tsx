import React from 'react';

import { TDemoComponent } from 'src/core/types';
import { EditCampaignRoot } from 'src/components/Campaign/EditCampaign';
import {
  TCampaign,
  TCampaignNodeChangeParams,
  TCampaignPage,
  TCampaignQuestion,
  TCampaignSection,
} from 'src/entities/Campaign/types';

const defaultQuestionData: TCampaignQuestion = {
  questionId: 2,
  typeId: 1,
  orderNumber: 2,
  displayNumber: '1.3.',
  // text: 'Fake question',
  text: 'Fake question with an extra long text data to check flex adaptive layout',
  remark:
    'By "adding" new fields, you will automatically import references entered in previous years. If field is empty, please complete it with relevant reference.',
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultSectionData: TCampaignSection = {
  sectionId: 18709239,
  orderNumber: 1,
  displayNumber: '1.',
  name: 'Contact Information',
  remark:
    'Note: all information provided throughout this campaign should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
  items: [defaultQuestionData],
};
const defaultPageData: TCampaignPage = {
  pageId: 7463886,
  name: 'Test page',
  orderNumber: 1,
  items: [defaultSectionData],
};
const defaultCampaignData: TCampaign = {
  id: 111,
  name: 'Minimal campaign sample',
  items: [defaultPageData],
};

export const DemoEditCampaign: TDemoComponent = () => {
  const [campaignData, setCampaignData] = React.useState<TCampaign>(defaultCampaignData);
  const handleChange = React.useCallback((params: TCampaignNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal campaign sample', items: Array(1)}
      // nodeId, // 111
      // value, // [{…}]
      // valueId, // "items"
    } = params;

    setCampaignData(nodeData as TCampaign);
  }, []);
  return (
    <div className="DemoEditCampaign">
      <EditCampaignRoot
        // prettier-ignore
        campaignData={campaignData}
        onChange={handleChange}
      />
    </div>
  );
};

DemoEditCampaign.__title = 'Edit Campaign';
