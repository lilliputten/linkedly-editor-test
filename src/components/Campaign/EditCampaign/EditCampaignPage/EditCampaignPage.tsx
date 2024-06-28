import React from 'react';
import classNames from 'classnames';

import {
  TCampaignNodeChangeParams,
  TCampaignPage,
  TCampaignSection,
} from 'src/entities/Campaign/types';
import { EditCampaignSection } from 'src/components/Campaign/EditCampaign/EditCampaignSection';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeItemRow,
  CampaignNodeOwnContent,
} from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Campaign/EditableNode/EditableNode';

interface TEditCampaignPageProps {
  pageData: TCampaignPage;
  className?: string;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

const EditCampaignPageContent: React.FC<{
  pageData: TCampaignPage;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { pageData, handleChange } = props;
  const {
    // prettier-ignore
    pageId,
    orderNumber,
  } = pageData;
  return (
    <>
      <CampaignNodeItemRow title="ID:" activeButtonId={`page-${pageId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`page-${pageId}-id`}
          nodeId={`page-${pageId}-id`}
          activeButtonId={`page-${pageId}-id-button`}
          editableType="text"
          title="Page ID"
          value={pageId || ''}
          valueId="pageId"
          onChange={handleChange}
        />
      </CampaignNodeItemRow>
      <CampaignNodeItemRow
        title="Order Number:"
        activeButtonId={`page-${pageId}-orderNumber-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`page-${pageId}-orderNumber`}
          nodeId={`page-${pageId}-orderNumber`}
          activeButtonId={`page-${pageId}-orderNumber-button`}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </CampaignNodeItemRow>
    </>
  );
};

export const EditCampaignPage: React.FC<TEditCampaignPageProps> = (props) => {
  const { pageData, className, onChange } = props;
  const { pageId, name, items } = pageData;
  // Sort sections
  const sortedSections = useSortedCampaignItems(items);

  const handleItemChange = React.useCallback(
    (params: TCampaignNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TCampaignQuestion).questionId;
      const changedItems = pageData.items.map((item) => {
        if (nodeId === (item as TCampaignSection).sectionId) {
          return nodeData as TCampaignSection;
        }
        return item;
      });
      const changedPageData: TCampaignPage = { ...pageData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TCampaignNodeChangeParams = {
        nodeData: changedPageData,
        nodeId: pageId,
        value: changedItems,
        valueId,
      };
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [pageId, pageData, onChange],
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
      const id = valueId as keyof TCampaignPage;
      // Create updated question data object...
      const changedPageData: TCampaignPage = { ...pageData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TCampaignNodeChangeParams = {
        nodeData: changedPageData,
        nodeId: pageId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [pageId, pageData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`page-${pageId}-name`}
        editableType="text"
        title="Page Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [pageId, name, handleChange]);
  return (
    <CampaignNode nodeType="page" nodeId={pageId} className={classNames(className)}>
      <CampaignNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />
      <CampaignNodeOwnContent nodeBaseType="page-own-content">
        <EditCampaignPageContent pageData={pageData} handleChange={handleChange} />
      </CampaignNodeOwnContent>
      <CampaignNodeFoldedContent nodeBaseType="page-content" indent>
        {sortedSections.map((sectionData) => {
          return (
            <EditCampaignSection
              key={sectionData.sectionId}
              sectionData={sectionData}
              onChange={handleItemChange}
            />
          );
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
