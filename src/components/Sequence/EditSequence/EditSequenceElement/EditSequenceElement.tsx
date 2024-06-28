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
import { sequenceEditableTypeOptions } from 'src/components/Sequence/EditableNode/types/TSequenceElementEditableType';

import styles from './EditSequenceElement.module.scss';

interface TEditSequenceElementProps {
  SequenceElementData: TSequenceElement;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

/** DEBUG: Show plain sequence data */
const debugShowRawSequenceElement = false;

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
    creditsCount,
    text,
    remark,
  } = SequenceElementData;
  // const typeText = getSequenceElementTypeName(typeId);
  if (debugShowRawSequenceElement) {
    // prettier-ignore
    return (
      <>
        <SequenceNodeTitle>Sequence Element {sequenceElementId}</SequenceNodeTitle>
        <div><strong>typeId:</strong> {typeId}</div>
        <div><strong>orderNumber:</strong> {orderNumber}</div>
        <div><strong>creditsCount:</strong> {creditsCount}</div>
        <div><strong>text:</strong> {text}</div>
        <div><strong>remark:</strong> {remark}</div>
      </>
    );
  }
  return <>{text}</>;
};

export const EditSequenceElement: React.FC<TEditSequenceElementProps> = (props) => {
  const { SequenceElementData, className, onChange } = props;
  const {
    // prettier-ignore
    sequenceElementId,
    creditsCount,
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
  const creditsCountNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`sequenceElement-${sequenceElementId}-prefix`}
        editableType="text"
        title="Display Number"
        value={creditsCount}
        valueId="creditsCount"
        onChange={handleChange}
        // noShrink
      />
    );
  }, [sequenceElementId, creditsCount, handleChange]);
  const textNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`sequenceElement-${sequenceElementId}-text`}
        editableType="text"
        title="Sequence Element Text"
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
      // indent
    >
      {/* <SequenceNodeHeader
        // prettier-ignore
        prefix={creditsCountNode}
        title={textNode}
        icon="[O]"
        toolbar="[TOOLBAR]"
      /> */}
      <SequenceNodeOwnContent
        nodeBaseType="sequenceElement-own-content"
        className={styles.nodeOwnContent}
        indent
      >
        <EditSequenceElementContent
          SequenceElementData={SequenceElementData}
          handleChange={handleChange}
        />
      </SequenceNodeOwnContent>
    </SequenceNode>
  );
};
