import React from 'react';
import classNames from 'classnames';

import { TCampaignItem, TCampaignQuestion, TCampaignSection } from 'src/entities/Campaign/types';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeRemark,
} from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';
import { EditCampaignQuestion, EditCampaignSection } from '../../EditCampaign';

interface TViewCampaignSectionProps {
  sectionData: TCampaignSection;
  className?: string;
}

type TCampaignItemProps = { itemData: TCampaignItem };

/** Render folderd section or question */
const ViewCampaignItem: React.FC<TCampaignItemProps> = ({ itemData }) => {
  const isQuestion = !!(itemData as TCampaignQuestion).questionId;
  if (isQuestion) {
    return <EditCampaignQuestion questionData={itemData as TCampaignQuestion} />;
  } else {
    return <EditCampaignSection sectionData={itemData as TCampaignSection} />;
  }
};

export const ViewCampaignSection: React.FC<TViewCampaignSectionProps> = (props) => {
  const { sectionData, className } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    name,
    remark,
    items,
  } = sectionData;
  // Sort items
  const sortedItems = useSortedCampaignItems(items);
  return (
    <CampaignNode nodeType="section" nodeId={sectionId} className={classNames(className)}>
      <CampaignNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={name}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      {remark && <CampaignNodeRemark>{remark}</CampaignNodeRemark>}
      <CampaignNodeFoldedContent nodeBaseType="section-content" indent>
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TCampaignQuestion).questionId || (itemData as TCampaignSection).sectionId;
          return <ViewCampaignItem key={key} itemData={itemData} />;
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
