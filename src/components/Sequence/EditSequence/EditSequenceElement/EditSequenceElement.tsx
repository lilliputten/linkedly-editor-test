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
  questionData: TSequenceElement;
  className?: string;
  onChange?: (params: TSequenceNodeChangeParams) => void;
}

/** DEBUG: Show plain question data */
const debugShowRawQuestion = false;

const EditSequenceElementContent: React.FC<{
  questionData: TSequenceElement;
  handleChange: (params: TEditableNodeChangeParams) => void;
}> = (props) => {
  const { questionData, handleChange } = props;
  const {
    // prettier-ignore
    questionId,
    typeId,
    orderNumber,
    displayNumber,
    text,
    remark,
  } = questionData;
  // const typeText = getSequenceElementTypeName(typeId);
  if (debugShowRawQuestion) {
    // prettier-ignore
    return (
      <>
        <SequenceNodeTitle>Question {questionId}</SequenceNodeTitle>
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
      <SequenceNodeItemRow title="ID:" activeButtonId={`question-${questionId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-id`}
          nodeId={`question-${questionId}-id`}
          activeButtonId={`question-${questionId}-id-button`}
          className={classNames(styles.item)}
          editableType="text"
          title="Question ID"
          value={questionId || ''}
          valueId="questionId"
          onChange={handleChange}
          isNumber
        />
      </SequenceNodeItemRow>
      <SequenceNodeItemRow
        title="Order Number:"
        activeButtonId={`question-${questionId}-orderNumber-button`}
      >
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-orderNumber`}
          nodeId={`question-${questionId}-orderNumber`}
          activeButtonId={`question-${questionId}-orderNumber-button`}
          className={classNames(styles.item)}
          editableType="text"
          title="Order Number"
          value={orderNumber}
          valueId="orderNumber"
          onChange={handleChange}
          isNumber
        />
      </SequenceNodeItemRow>
      <SequenceNodeItemRow title="Remark:" activeButtonId={`question-${questionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-remark`}
          nodeId={`question-${questionId}-remark`}
          activeButtonId={`question-${questionId}-remark-button`}
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
      <SequenceNodeItemRow title="Type:" activeButtonId={`question-${questionId}-type-button`}>
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-type`}
          nodeId={`question-${questionId}-type`}
          activeButtonId={`question-${questionId}-type-button`}
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
  const { questionData, className, onChange } = props;
  const {
    // prettier-ignore
    questionId,
    displayNumber,
    text,
    // remark,
    // typeId,
    // orderNumber,
  } = questionData;
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
      // Create updated question data object...
      const changedQuestionData: TSequenceElement = { ...questionData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TSequenceNodeChangeParams = {
        nodeData: changedQuestionData,
        nodeId: questionId,
        value,
        valueId,
        reorderRequired,
      };
      if (onChange) {
        onChange(changedParams);
      }
    },
    [questionId, questionData, onChange],
  );
  const displayNumberNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`question-${questionId}-prefix`}
        editableType="text"
        title="Display Number"
        value={displayNumber}
        valueId="displayNumber"
        onChange={handleChange}
        // noShrink
      />
    );
  }, [questionId, displayNumber, handleChange]);
  const textNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`question-${questionId}-text`}
        editableType="text"
        title="Question Text"
        value={text}
        valueId="text"
        onChange={handleChange}
        flex={1}
      />
    );
  }, [questionId, text, handleChange]);
  return (
    <SequenceNode
      nodeType="question"
      nodeId={questionId}
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
      <SequenceNodeOwnContent nodeBaseType="question-own-content" className={styles.nodeOwnContent}>
        <EditSequenceElementContent questionData={questionData} handleChange={handleChange} />
      </SequenceNodeOwnContent>
      <SequenceNodeFoldedContent
        nodeBaseType="question-content"
        className={styles.nodeFoldedContent}
      >
        {/* // XXX: To show remark here or below the header?
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-remark`}
          nodeId={`question-${questionId}-remark`}
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
