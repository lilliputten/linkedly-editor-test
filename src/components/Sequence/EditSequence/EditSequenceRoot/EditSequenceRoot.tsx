import React from 'react';
import classNames from 'classnames';

import { TSequence, TSequenceNodeChangeParams, TSequencePage } from 'src/entities/Sequence/types';
import { EditSequencePage } from 'src/components/Sequence/EditSequence/EditSequencePage';
import {
  SequenceNode,
  SequenceNodeFoldedContent,
  SequenceNodeItemRow,
  SequenceNodeOwnContent,
} from 'src/components/Sequence/SequenceNode';
import { useSortedSequenceItems } from 'src/components/Sequence/SequenceNode/hooks';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Sequence/EditableNode/EditableNode';
import { SequenceNodeHeader } from 'src/components/Sequence/SequenceNode/SequenceNodeHeader';

interface TEditSequenceProps {
  sequenceData: TSequence;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

const EditSequenceRootContent: React.FC<{
  sequenceData: TSequence;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { sequenceData, handleChange } = props;
  const {
    // prettier-ignore
    id: sequenceId,
    // orderNumber,
  } = sequenceData;
  return (
    <>
      <SequenceNodeItemRow title="ID:" activeButtonId={`sequence-${sequenceId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`sequence-${sequenceId}-id`}
          nodeId={`sequence-${sequenceId}-id`}
          activeButtonId={`sequence-${sequenceId}-id-button`}
          editableType="text"
          title="Sequence ID"
          value={sequenceId || ''}
          valueId="sequenceId"
          onChange={handleChange}
        />
      </SequenceNodeItemRow>
    </>
  );
};

export const EditSequenceRoot: React.FC<TEditSequenceProps> = (props) => {
  const { sequenceData, className, onChange } = props;
  const { id: sequenceId, name, items } = sequenceData;
  // Sort pages
  const sortedPages = useSortedSequenceItems(items);

  const handleItemChange = React.useCallback(
    (params: TSequenceNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isQuestion = !!(nodeData as TSequenceElement).questionId;
      const changedItems = sequenceData.items.map((item) => {
        if (nodeId === item.pageId) {
          return nodeData as TSequencePage;
        }
        return item;
      });
      const changedSequenceData: TSequence = { ...sequenceData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSequenceNodeChangeParams = {
        nodeData: changedSequenceData,
        nodeId: sequenceId,
        value: changedItems,
        valueId,
      };
      if (onChange) {
        onChange(changedItemsParams);
      }
    },
    [sequenceId, sequenceData, onChange],
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
      const id = valueId as keyof TSequence;
      // Create updated question data object...
      const changedSequenceData: TSequence = { ...sequenceData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber'; // XXX: Is it used here?
      // Construct parameters data for up-level change handler
      const changedParams: TSequenceNodeChangeParams = {
        nodeData: changedSequenceData,
        nodeId: sequenceId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [sequenceId, sequenceData, onChange],
  );

  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`sequence-${sequenceId}-name`}
        editableType="text"
        title="Sequence Name"
        value={name || ''}
        valueId="name"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [sequenceId, name, handleChange]);
  return (
    <SequenceNode nodeType="root" nodeId={sequenceId} className={classNames(className)} root>
      <SequenceNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[SEQUENCE]"
        toolbar="[TOOLBAR]"
      />
      <SequenceNodeOwnContent nodeBaseType="page-own-content">
        <EditSequenceRootContent sequenceData={sequenceData} handleChange={handleChange} />
      </SequenceNodeOwnContent>
      <SequenceNodeFoldedContent nodeBaseType="root-content" root indent>
        {sortedPages.map((pageData) => {
          return (
            <EditSequencePage
              key={pageData.pageId}
              pageData={pageData}
              onChange={handleItemChange}
            />
          );
        })}
      </SequenceNodeFoldedContent>
    </SequenceNode>
  );
};
