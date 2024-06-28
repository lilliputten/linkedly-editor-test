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
  surveyData: TCampaign;
  className?: string;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

const EditCampaignRootContent: React.FC<{
  surveyData: TCampaign;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { surveyData, handleChange } = props;
  const {
    // prettier-ignore
    id: surveyId,
    // orderNumber,
  } = surveyData;
  return (
    <>
      <CampaignNodeItemRow title="ID:" activeButtonId={`campaign-${surveyId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`campaign-${surveyId}-id`}
          nodeId={`campaign-${surveyId}-id`}
          activeButtonId={`campaign-${surveyId}-id-button`}
          editableType="text"
          title="Campaign ID"
          value={surveyId || ''}
          valueId="surveyId"
          onChange={handleChange}
        />
      </CampaignNodeItemRow>
    </>
  );
};

export const EditCampaignRoot: React.FC<TEditCampaignProps> = (props) => {
  const { surveyData, className, onChange } = props;
  const { id: surveyId, name, items } = surveyData;
  // Sort pages
  const sortedPages = useSortedCampaignItems(items);

  const handleItemChange = React.useCallback(
    (params: TCampaignNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TCampaignQuestion).questionId;
      const changedItems = surveyData.items.map((item) => {
        if (nodeId === item.pageId) {
          return nodeData as TCampaignPage;
        }
        return item;
      });
      const changedCampaignData: TCampaign = { ...surveyData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TCampaignNodeChangeParams = {
        nodeData: changedCampaignData,
        nodeId: surveyId,
        value: changedItems,
        valueId,
      };
      console.log('[EditCampaignRoot:handleItemChange]', valueId, {
        changedItems,
        surveyId,
        params,
        surveyData,
        changedCampaignData,
        changedItemsParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [surveyId, surveyData, onChange],
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
      const changedCampaignData: TCampaign = { ...surveyData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber'; // XXX: Is it used here?
      // Construct parameters data for up-level change handler
      const changedParams: TCampaignNodeChangeParams = {
        nodeData: changedCampaignData,
        nodeId: surveyId,
        value,
        valueId,
        reorderRequired,
      };
      console.log('[EditCampaignRoot:handleChange]', valueId, {
        value,
        valueId,
        params,
        reorderRequired,
        surveyId,
        surveyData,
        changedCampaignData,
        changedParams,
      });
      // debugger;
      if (onChange) {
        onChange(changedParams);
      }
    },
    [surveyId, surveyData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`campaign-${surveyId}-name`}
        editableType="text"
        title="Campaign Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [surveyId, name, handleChange]);
  return (
    <CampaignNode nodeType="root" nodeId={surveyId} className={classNames(className)} root>
      <CampaignNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[SURVEY]"
        toolbar="[TOOLBAR]"
      />
      <CampaignNodeOwnContent nodeBaseType="page-own-content">
        <EditCampaignRootContent surveyData={surveyData} handleChange={handleChange} />
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
