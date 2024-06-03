import React from 'react';
import classNames from 'classnames';

import { TSurveyQuestion } from 'src/entities/Survey/types';
import {
  SurveyNode,
  SurveyNodeContent,
  SurveyNodeItemRow,
  SurveyNodeTitle,
} from 'src/components/Survey/SurveyNode';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';
import { questionEditableTypeOptions } from 'src/components/Survey/EditableNode/types/TQuestionEditableType';

import styles from './EditSurveyQuestion.module.scss';

interface TEditSurveyQuestionProps {
  questionData: TSurveyQuestion;
  className?: string;
}

/** DEBUG: Show plain question data */
const debugShowRawQuestion = false;

export const EditSurveyQuestionContent: React.FC<{ questionData: TSurveyQuestion }> = (props) => {
  const { questionData } = props;
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
        <SurveyNodeTitle>Question {questionId}</SurveyNodeTitle>
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
      {/* // XXX: To show remark here or below the header? */}
      <SurveyNodeItemRow title="Remark:" activeButtonId={`${questionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`${questionId}-remark`}
          nodeId={`${questionId}-remark`}
          activeButtonId={`${questionId}-remark-button`}
          className={classNames(styles.item)}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          // textClassName={styles.remark}
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow title="Type:" activeButtonId={`${questionId}-type-button`}>
        <EditableNode
          // prettier-ignore
          key={`${questionId}-type`}
          nodeId={`${questionId}-type`}
          activeButtonId={`${questionId}-type-button`}
          className={classNames(styles.item)}
          editableType="select"
          selectOptions={questionEditableTypeOptions}
          title="Question Type"
          value={typeId}
          // flex={1}
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveyQuestion: React.FC<TEditSurveyQuestionProps> = (props) => {
  const { questionData, className } = props;
  const {
    // prettier-ignore
    questionId,
    displayNumber,
    text,
    // remark,
    // typeId,
    // orderNumber,
  } = questionData;
  const displayNumberNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`${questionId}-prefix`}
        editableType="text"
        title="Display Number"
        value={displayNumber}
        // noShrink
      />
    );
  }, [questionId, displayNumber]);
  const textNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`${questionId}-text`}
        editableType="text"
        title="Question Text"
        value={text}
        flex={1}
      />
    );
  }, [questionId, text]);
  return (
    <SurveyNode
      nodeType="question"
      nodeId={questionId}
      className={classNames(className, styles.root)}
      indent
    >
      <SurveyNodeHeader
        // prettier-ignore
        prefix={displayNumberNode}
        title={textNode}
        icon="[O]"
        toolbar="[TOOLBAR]"
      />
      <SurveyNodeContent nodeBaseType="question-content" className={styles.nodeContent}>
        {/* // XXX: To show remark here or below the header?
        <EditableNode
          // prettier-ignore
          key={`${questionId}-remark`}
          nodeId={`${questionId}-remark`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          textClassName={styles.remark}
        />
        */}
        <EditSurveyQuestionContent questionData={questionData} />
      </SurveyNodeContent>
    </SurveyNode>
  );
};
