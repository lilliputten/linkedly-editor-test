import React from 'react';
import classNames from 'classnames';

import { TCampaignNodeChangeParams, TCampaignQuestion } from 'src/entities/Campaign/types';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeItemRow,
  CampaignNodeOwnContent,
  CampaignNodeTitle,
} from 'src/components/Campaign/CampaignNode';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';

import {
  EditableNode,
  TEditableNodeChangeParams,
} from 'src/components/Campaign/EditableNode/EditableNode';
import { questionEditableTypeOptions } from 'src/components/Campaign/EditableNode/types/TQuestionEditableType';

import styles from './EditCampaignQuestion.module.scss';

interface TEditCampaignQuestionProps {
  questionData: TCampaignQuestion;
  className?: string;
  onChange?: (params: TCampaignNodeChangeParams) => void;
}

/** DEBUG: Show plain question data */
const debugShowRawQuestion = false;

const EditCampaignQuestionContent: React.FC<{
  questionData: TCampaignQuestion;
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
  // const typeText = getQuestionTypeName(typeId);
  if (debugShowRawQuestion) {
    // prettier-ignore
    return (
      <>
        <CampaignNodeTitle>Question {questionId}</CampaignNodeTitle>
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
      <CampaignNodeItemRow title="ID:" activeButtonId={`question-${questionId}-id-button`}>
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
      </CampaignNodeItemRow>
      <CampaignNodeItemRow
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
      </CampaignNodeItemRow>
      <CampaignNodeItemRow title="Remark:" activeButtonId={`question-${questionId}-remark-button`}>
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
      </CampaignNodeItemRow>
      <CampaignNodeItemRow title="Type:" activeButtonId={`question-${questionId}-type-button`}>
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
      </CampaignNodeItemRow>
    </>
  );
};

export const EditCampaignQuestion: React.FC<TEditCampaignQuestionProps> = (props) => {
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
      const id = valueId as keyof TCampaignQuestion;
      // Create updated question data object...
      const changedQuestionData: TCampaignQuestion = { ...questionData, [id]: value };
      // Is reorder required for uplevel container? (TODO: Track the current node in viewpoint on re-order?)
      const reorderRequired = valueId === 'orderNumber';
      // Construct parameters data for up-level change handler
      const changedParams: TCampaignNodeChangeParams = {
        nodeData: changedQuestionData,
        nodeId: questionId,
        value,
        valueId,
        reorderRequired,
      };
      console.log('[EditCampaignQuestion:handleChange]', valueId, {
        value,
        valueId,
        params,
        reorderRequired,
        questionId,
        questionData,
        changedQuestionData,
        changedParams,
      });
      // debugger;
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
    <CampaignNode
      nodeType="question"
      nodeId={questionId}
      className={classNames(className, styles.root)}
      indent
    >
      <CampaignNodeHeader
        // prettier-ignore
        prefix={displayNumberNode}
        title={textNode}
        icon="[O]"
        toolbar="[TOOLBAR]"
      />
      <CampaignNodeOwnContent nodeBaseType="question-own-content" className={styles.nodeOwnContent}>
        <EditCampaignQuestionContent questionData={questionData} handleChange={handleChange} />
      </CampaignNodeOwnContent>
      <CampaignNodeFoldedContent
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
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
