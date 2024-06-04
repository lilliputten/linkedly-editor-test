import React from 'react';
import classNames from 'classnames';

import { TSurveyQuestion } from 'src/entities/Survey/types';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
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

const EditSurveyQuestionContent: React.FC<{ questionData: TSurveyQuestion }> = (props) => {
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
      <SurveyNodeItemRow title="ID:" activeButtonId={`question-${questionId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-id`}
          nodeId={`question-${questionId}-id`}
          activeButtonId={`question-${questionId}-id-button`}
          className={classNames(styles.item)}
          editableType="text"
          title="Question ID"
          value={questionId || ''}
          flex={1}
          wrap
          // textClassName={styles.remark}
        />
      </SurveyNodeItemRow>
      {/* // XXX: To show remark here or below the header? */}
      <SurveyNodeItemRow title="Remark:" activeButtonId={`question-${questionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`question-${questionId}-remark`}
          nodeId={`question-${questionId}-remark`}
          activeButtonId={`question-${questionId}-remark-button`}
          className={classNames(styles.item)}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          // textClassName={styles.remark}
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow title="Type:" activeButtonId={`question-${questionId}-type-button`}>
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
        nodeId={`question-${questionId}-prefix`}
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
        nodeId={`question-${questionId}-text`}
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
      <SurveyNodeOwnContent nodeBaseType="question-own-content" className={styles.nodeOwnContent}>
        <EditSurveyQuestionContent questionData={questionData} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="question-content" className={styles.nodeFoldedContent}>
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
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
