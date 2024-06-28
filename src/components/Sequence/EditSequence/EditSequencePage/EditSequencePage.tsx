import React from 'react';
import classNames from 'classnames';

import {
  TSequenceNodeChangeParams,
  TSequencePage,
  TSequenceSection,
} from 'src/entities/Sequence/types';
import { EditSequenceSection } from 'src/components/Sequence/EditSequence/EditSequenceSection';
import {
  SequenceNode,
  SequenceNodeFoldedContent,
  SequenceNodeItemRow,
  SequenceNodeOwnContent,
} from 'src/components/Sequence/SequenceNode';
import { useSortedSequenceItems } from 'src/components/Sequence/SequenceNode/hooks';
import { SequenceNodeHeader } from 'src/components/Sequence/SequenceNode/SequenceNodeHeader';
import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Sequence/EditableNode/EditableNode';

interface TEditSequencePageProps {
  pageData: TSequencePage;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

const EditSequencePageContent: React.FC<{
  pageData: TSequencePage;
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
      <SequenceNodeItemRow title="ID:" activeButtonId={`page-${pageId}-id-button`}>
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
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
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
      </SequenceNodeItemRow>
    </>
  );
};

export const EditSequencePage: React.FC<TEditSequencePageProps> = (props) => {
  const { pageData, className, onChange } = props;
  const { pageId, name, items } = pageData;
  // Sort sections
  const sortedSections = useSortedSequenceItems(items);

  const handleItemChange = React.useCallback(
    (params: TSequenceNodeChangeParams) => {
      const { nodeId, nodeData } = params;
      // const isSequenceElement = !!(nodeData as TSequenceElement).sequenceElementId;
      const changedItems = pageData.items.map((item) => {
        if (nodeId === (item as TSequenceSection).sectionId) {
          return nodeData as TSequenceSection;
        }
        return item;
      });
      const changedPageData: TSequencePage = { ...pageData, items: changedItems };
      const valueId = 'items';
      const changedItemsParams: TSequenceNodeChangeParams = {
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
      const id = valueId as keyof TSequencePage;
      // Create updated sequence data object...
      const changedPageData: TSequencePage = { ...pageData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSequenceNodeChangeParams = {
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
    <SequenceNode nodeType="page" nodeId={pageId} className={classNames(className)}>
      <SequenceNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />
      <SequenceNodeOwnContent nodeBaseType="page-own-content">
        <EditSequencePageContent pageData={pageData} handleChange={handleChange} />
      </SequenceNodeOwnContent>
      <SequenceNodeFoldedContent nodeBaseType="page-content" indent>
        {sortedSections.map((sectionData) => {
          return (
            <EditSequenceSection
              key={sectionData.sectionId}
              sectionData={sectionData}
              onChange={handleItemChange}
            />
          );
        })}
      </SequenceNodeFoldedContent>
    </SequenceNode>
  );
};
