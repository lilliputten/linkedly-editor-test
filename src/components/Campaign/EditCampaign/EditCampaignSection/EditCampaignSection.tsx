import React from 'react';
import classNames from 'classnames';

import {
  TCampaignItem,
  TCampaignNodeChangeParams,
  TCampaignQuestion,
  TCampaignSection,
} from 'src/entities/Campaign/types';
import { EditCampaignQuestion } from 'src/components/Campaign/EditCampaign/EditCampaignQuestion';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeItemRow,
  CampaignNodeOwnContent,
  // CampaignNodeRemark,
} from 'src/components/Campaign/CampaignNode';
import { useSortedCampaignItems } from 'src/components/Campaign/CampaignNode/hooks';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Campaign/EditableNode/EditableNode';

interface TEditCampaignSectionProps {
  sectionData: TCampaignSection;
  className?: string;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

interface TCampaignItemProps {
  itemData: TCampaignItem;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

/** Render folderd section or question */
const EditCampaignItem: React.FC<TCampaignItemProps> = ({ itemData, onChange }) => {
  const isQuestion = !!(itemData as TCampaignQuestion).questionId;
  if (isQuestion) {
    return (
      <EditCampaignQuestion questionData={itemData as TCampaignQuestion} onChange={onChange} />
    );
  } else {
    return <EditCampaignSection sectionData={itemData as TCampaignSection} onChange={onChange} />;
  }
};

const EditCampaignSectionContent: React.FC<{
  sectionData: TCampaignSection;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { sectionData, handleChange } = props;
  const {
    // prettier-ignore
    sectionId,
    remark,
    orderNumber,
  } = sectionData;
  return (
    <>
      <CampaignNodeItemRow title="ID:" activeButtonId={`section-${sectionId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-id`}
          nodeId={`section-${sectionId}-id`}
          activeButtonId={`section-${sectionId}-id-button`}
          editableType="text"
          title="Section ID"
          value={sectionId || ''}
          valueId="sectionId"
          onChange={handleChange}
          isNumber
        />
      </CampaignNodeItemRow>
      <CampaignNodeItemRow
        title="Order Number:"
        activeButtonId={`section-${sectionId}-orderNumber-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-orderNumber`}
          nodeId={`section-${sectionId}-orderNumber`}
          activeButtonId={`section-${sectionId}-orderNumber-button`}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </CampaignNodeItemRow>
      <CampaignNodeItemRow title="Remark:" activeButtonId={`section-${sectionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-remark`}
          nodeId={`section-${sectionId}-remark`}
          activeButtonId={`section-${sectionId}-remark-button`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          valueId="remark"
          onChange={handleChange}
        />
      </CampaignNodeItemRow>
    </>
  );
};

export const EditCampaignSection: React.FC<TEditCampaignSectionProps> = (props) => {
  const { sectionData, className, onChange } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    name,
    // remark,
    items,
  } = sectionData;
  // Sort items
  const sortedItems = useSortedCampaignItems(items);
  const handleItemChange = React.useCallback(
    (params: TCampaignNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TCampaignQuestion).questionId;
      const changedItems = sectionData.items.map((item) => {
        if (
          nodeId === (item as TCampaignQuestion).questionId ||
          nodeId === (item as TCampaignSection).sectionId
        ) {
          return nodeData as TCampaignItem;
        }
        return item;
      });
      const changedSectionData: TCampaignSection = { ...sectionData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TCampaignNodeChangeParams = {
        nodeData: changedSectionData,
        nodeId: sectionId,
        value: changedItems,
        valueId,
      };
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [sectionId, sectionData, onChange],
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
      const id = valueId as keyof TCampaignSection;
      // Create updated question data object...
      const changedSectionData: TCampaignSection = { ...sectionData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TCampaignNodeChangeParams = {
        nodeData: changedSectionData,
        nodeId: sectionId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [sectionId, sectionData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`section-${sectionId}-name`}
        editableType="text"
        title="Section Name"
        value={name}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [sectionId, name, handleChange]);
  return (
    <CampaignNode nodeType="section" nodeId={sectionId} className={classNames(className)} indent>
      <CampaignNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={nameNode}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      <CampaignNodeOwnContent nodeBaseType="section-own-content">
        <EditCampaignSectionContent sectionData={sectionData} handleChange={handleChange} />
      </CampaignNodeOwnContent>
      <CampaignNodeFoldedContent nodeBaseType="section-content">
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TCampaignQuestion).questionId || (itemData as TCampaignSection).sectionId;
          return <EditCampaignItem key={key} itemData={itemData} onChange={handleItemChange} />;
        })}
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
