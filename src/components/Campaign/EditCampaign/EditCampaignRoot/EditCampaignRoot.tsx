import React from 'react';
import classNames from 'classnames';

import { TCampaign, TCampaignNodeChangeParams, TCampaignPage } from 'src/entities/Campaign/types';
import { EditCampaignPage } from 'src/components/Campaign/EditCampaign/EditCampaignPage';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeItemRow,
  CampaignNodeOwnContent,
} from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Campaign/EditableNode/EditableNode';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';

interface TEditCampaignProps {
  campaignData: TCampaign;
  className?: string;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

const EditCampaignRootContent: React.FC<{
  campaignData: TCampaign;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { campaignData, handleChange } = props;
  const {
    // prettier-ignore
    id: campaignId,
    // orderNumber,
  } = campaignData;
  return (
    <>
      <CampaignNodeItemRow title="ID:" activeButtonId={`campaign-${campaignId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`campaign-${campaignId}-id`}
          nodeId={`campaign-${campaignId}-id`}
          activeButtonId={`campaign-${campaignId}-id-button`}
          editableType="text"
          title="Campaign ID"
          value={campaignId || ''}
          valueId="campaignId"
          onChange={handleChange}
        />
      </CampaignNodeItemRow>
    </>
  );
};

export const EditCampaignRoot: React.FC<TEditCampaignProps> = (props) => {
  const { campaignData, className, onChange } = props;
  const { id: campaignId, name, items } = campaignData;
  // Sort pages
  const sortedPages = useSortedCampaignItems(items);

  const handleItemChange = React.useCallback(
    (params: TCampaignNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TCampaignQuestion).questionId;
      const changedItems = campaignData.items.map((item) => {
        if (nodeId === item.pageId) {
          return nodeData as TCampaignPage;
        }
        return item;
      });
      const changedCampaignData: TCampaign = { ...campaignData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TCampaignNodeChangeParams = {
        nodeData: changedCampaignData,
        nodeId: campaignId,
        value: changedItems,
        valueId,
      };
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [campaignId, campaignData, onChange],
  );

  const handleChange = React.useCallback(
    (params: TEditableNodeChangeParams) => {
      const { valueId, value } = params;
      // Check if value id has defined...
      if (!valueId) {
        const error = new Error('No value id provided!');
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-debugger
        debugger;
      }
      const id = valueId as keyof TCampaign;
      // Create updated question data object...
      const changedCampaignData: TCampaign = { ...campaignData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber'; // XXX: Is it used here?
      // Construct parameters data for up-level change handler
      const changedParams: TCampaignNodeChangeParams = {
        nodeData: changedCampaignData,
        nodeId: campaignId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [campaignId, campaignData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`campaign-${campaignId}-name`}
        editableType="text"
        title="Campaign Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [campaignId, name, handleChange]);
  return (
    <CampaignNode nodeType="root" nodeId={campaignId} className={classNames(className)} root>
      <CampaignNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[CAMPAIGN]"
        toolbar="[TOOLBAR]"
      />
      <CampaignNodeOwnContent nodeBaseType="page-own-content">
        <EditCampaignRootContent campaignData={campaignData} handleChange={handleChange} />
      </CampaignNodeOwnContent>
      <CampaignNodeFoldedContent nodeBaseType="root-content" root indent>
        {sortedPages.map((pageData) => {
          return (
            <EditCampaignPage
              key={pageData.pageId}
              pageData={pageData}
              onChange={handleItemChange}
            />
          );
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
