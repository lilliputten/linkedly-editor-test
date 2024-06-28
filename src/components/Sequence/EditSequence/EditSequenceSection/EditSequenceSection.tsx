import React from 'react';
import classNames from 'classnames';

import {
  TSequenceItem,
  TSequenceNodeChangeParams,
  TSequenceQuestion,
  TSequenceSection,
} from 'src/entities/Sequence/types';
import { EditSequenceQuestion } from 'src/components/Sequence/EditSequence/EditSequenceQuestion';
import {
  SequenceNode,
  SequenceNodeFoldedContent,
  SequenceNodeItemRow,
  SequenceNodeOwnContent,
  // SequenceNodeRemark,
} from 'src/components/Sequence/SequenceNode';
import { useSortedSequenceItems } from 'src/components/Sequence/SequenceNode/hooks';
import { SequenceNodeHeader } from 'src/components/Sequence/SequenceNode/SequenceNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Sequence/EditableNode/EditableNode';

interface TEditSequenceSectionProps {
  sectionData: TSequenceSection;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

interface TSequenceItemProps {
  itemData: TSequenceItem;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

/** Render folderd section or question */
const EditSequenceItem: React.FC<TSequenceItemProps> = ({ itemData, onChange }) => {
  const isQuestion = !!(itemData as TSequenceQuestion).questionId;
  if (isQuestion) {
    return (
      <EditSequenceQuestion questionData={itemData as TSequenceQuestion} onChange={onChange} />
    );
  } else {
    return <EditSequenceSection sectionData={itemData as TSequenceSection} onChange={onChange} />;
  }
};

const EditSequenceSectionContent: React.FC<{
  sectionData: TSequenceSection;
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
      <SequenceNodeItemRow title="ID:" activeButtonId={`section-${sectionId}-id-button`}>
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
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
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
      </SequenceNodeItemRow>
      <SequenceNodeItemRow title="Remark:" activeButtonId={`section-${sectionId}-remark-button`}>
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
      </SequenceNodeItemRow>
    </>
  );
};

export const EditSequenceSection: React.FC<TEditSequenceSectionProps> = (props) => {
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
  const sortedItems = useSortedSequenceItems(items);
  const handleItemChange = React.useCallback(
    (params: TSequenceNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TSequenceQuestion).questionId;
      const changedItems = sectionData.items.map((item) => {
        if (
          nodeId === (item as TSequenceQuestion).questionId ||
          nodeId === (item as TSequenceSection).sectionId
        ) {
          return nodeData as TSequenceItem;
        }
        return item;
      });
      const changedSectionData: TSequenceSection = { ...sectionData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSequenceNodeChangeParams = {
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
      const id = valueId as keyof TSequenceSection;
      // Create updated question data object...
      const changedSectionData: TSequenceSection = { ...sectionData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSequenceNodeChangeParams = {
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
    <SequenceNode nodeType="section" nodeId={sectionId} className={classNames(className)} indent>
      <SequenceNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={nameNode}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      <SequenceNodeOwnContent nodeBaseType="section-own-content">
        <EditSequenceSectionContent sectionData={sectionData} handleChange={handleChange} />
      </SequenceNodeOwnContent>
      <SequenceNodeFoldedContent nodeBaseType="section-content">
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TSequenceQuestion).questionId || (itemData as TSequenceSection).sectionId;
          return <EditSequenceItem key={key} itemData={itemData} onChange={handleItemChange} />;
        })}
      </SequenceNodeFoldedContent>
    </SequenceNode>
  );
};
