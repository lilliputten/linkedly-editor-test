import React from 'react';
import classNames from 'classnames';

import { TSequenceNodeChangeParams, TSequenceElement } from 'src/entities/Sequence/types';
import {
  SequenceNode,
  SequenceNodeFoldedContent,
  SequenceNodeItemRow,
  SequenceNodeOwnContent,
  SequenceNodeTitle,
} from 'src/components/Sequence/SequenceNode';
import { SequenceNodeHeader } from 'src/components/Sequence/SequenceNode/SequenceNodeHeader';

import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Sequence/EditableNode/EditableNode';
import { questionEditableTypeOptions } from 'src/components/Sequence/EditableNode/types/TSequenceElementEditableType';

import styles from './EditSequenceElement.module.scss';

interface TEditSequenceElementProps {
  SequenceElementData: TSequenceElement;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

/** DEBUG: Show plain sequence data */
const debugShowRawQuestion = false;

const EditSequenceElementContent: React.FC<{
  SequenceElementData: TSequenceElement;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { SequenceElementData, handleChange } = props;
  const {
    // prettier-ignore
    sequenceElementId,
    typeId,
    orderNumber,
    displayNumber,
    text,
    remark,
  } = SequenceElementData;
  // const typeText = getSequenceElementTypeName(typeId);
  if (debugShowRawQuestion) {
    // prettier-ignore
    return (
      <>
        <SequenceNodeTitle>Question {sequenceElementId}</SequenceNodeTitle>
        <div><strong>typeId:</strong> {typeId}</div>
        <div><strong>orderNumber:</strong> {orderNumber}</div>
        <div><strong>displayNumber:</strong> {displayNumber}</div>
        <div><strong>text:</strong> {text}</div>
        <div><strong>remark:</strong> {remark}</div>
      </>
    );
  }
  return (
    <>
      <SequenceNodeItemRow
        title="ID:"
        activeButtonId={`sequenceElement-${sequenceElementId}-id-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`sequenceElement-${sequenceElementId}-id`}
          nodeId={`sequenceElement-${sequenceElementId}-id`}
          activeButtonId={`sequenceElement-${sequenceElementId}-id-button`}
          className={classNames(styles.item)}
          editableType="text"
          title="Question ID"
          value={sequenceElementId || ''}
          valueId="sequenceElementId"
          onChange={handleChange}
          isNumber
        />
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
        title="Order Number:"
        activeButtonId={`sequenceElement-${sequenceElementId}-orderNumber-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`sequenceElement-${sequenceElementId}-orderNumber`}
          nodeId={`sequenceElement-${sequenceElementId}-orderNumber`}
          activeButtonId={`sequenceElement-${sequenceElementId}-orderNumber-button`}
          className={classNames(styles.item)}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
        title="Remark:"
        activeButtonId={`sequenceElement-${sequenceElementId}-remark-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`sequenceElement-${sequenceElementId}-remark`}
          nodeId={`sequenceElement-${sequenceElementId}-remark`}
          activeButtonId={`sequenceElement-${sequenceElementId}-remark-button`}
          className={classNames(styles.item)}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          valueId="remark"
          onChange={handleChange}
          flex={1}
          wrap
        />
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
        title="Type:"
        activeButtonId={`sequenceElement-${sequenceElementId}-type-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`sequenceElement-${sequenceElementId}-type`}
          nodeId={`sequenceElement-${sequenceElementId}-type`}
          activeButtonId={`sequenceElement-${sequenceElementId}-type-button`}
          className={classNames(styles.item)}
          editableType="select"
          selectOptions={questionEditableTypeOptions}
          title="Question Type"
          value={typeId}
          valueId="typeId"
          onChange={handleChange}
        />
      </SequenceNodeItemRow>
    </>
  );
};

export const EditSequenceElement: React.FC<TEditSequenceElementProps> = (props) => {
  const { SequenceElementData, className, onChange } = props;
  const {
    // prettier-ignore
    sequenceElementId,
    displayNumber,
    text,
    // remark,
    // typeId,
    // orderNumber,
  } = SequenceElementData;
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
      const id = valueId as keyof TSequenceElement;
      // Create updated sequence data object...
      const changedSequenceElementData: TSequenceElement = { ...SequenceElementData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSequenceNodeChangeParams = {
        nodeData: changedSequenceElementData,
        nodeId: sequenceElementId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [sequenceElementId, SequenceElementData, onChange],
  );
  const displayNumberNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`sequenceElement-${sequenceElementId}-prefix`}
        editableType="text"
        title="Display Number"
        value={displayNumber}
        valueId="displayNumber"
        onChange={handleChange}
        // noShrink
      />
    );
  }, [sequenceElementId, displayNumber, handleChange]);
  const textNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`sequenceElement-${sequenceElementId}-text`}
        editableType="text"
        title="Question Text"
        value={text}
        valueId="text"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [sequenceElementId, text, handleChange]);
  return (
    <SequenceNode
      nodeType="sequenceElement"
      nodeId={sequenceElementId}
      className={classNames(className, styles.root)}
      indent
    >
      <SequenceNodeHeader
        // prettier-ignore
        prefix={displayNumberNode}
        title={textNode}
        icon="[O]"
        toolbar="[TOOLBAR]"
      />
      <SequenceNodeOwnContent
        nodeBaseType="sequenceElement-own-content"
        className={styles.nodeOwnContent}
      >
        <EditSequenceElementContent
          SequenceElementData={SequenceElementData}
          handleChange={handleChange}
        />
      </SequenceNodeOwnContent>
      <SequenceNodeFoldedContent
        nodeBaseType="sequenceElement-content"
        className={styles.nodeFoldedContent}
      >
        {/* // XXX: To show remark here or below the header?
        <EditableNode
          // prettier-ignore
          key={`sequenceElement-${sequenceElementId}-remark`}
          nodeId={`sequenceElement-${sequenceElementId}-remark`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          textClassName={styles.remark}
        />
        */}
      </SequenceNodeFoldedContent>
    </SequenceNode>
  );
};
