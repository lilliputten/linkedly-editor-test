import React from 'react';
import classNames from 'classnames';

import { TSurveyQuestion } from 'src/entities/Survey/types';
import {
  SurveyNode,
  SurveyNodeContent,
  SurveyNodeRemark,
  SurveyNodeTitle,
} from 'src/components/Survey/SurveyNode';
import { getQuestionTypeName } from 'src/entities/Survey/helpers';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

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
  const typeText = getQuestionTypeName(typeId);
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
      {/*
      <SurveyNodeTitle>Question {questionId}</SurveyNodeTitle>
      <div className={classNames(styles.item, styles.number)}><span className={styles.itemLabel}>Number:</span> {displayNumber}</div>
      <div className={classNames(styles.item, styles.text)}><span className={styles.itemLabel}>Text:</span> {text}</div>
      {!!remark && (
        <div className={classNames(styles.item, styles.remark)}>
          <span className={styles.itemLabel}>Remark:</span> {remark}
        </div>
      )}
      */}
      <div className={classNames(styles.item, styles.type)}>
        <span className={styles.itemLabel}>Type:</span> {typeText}
      </div>
      <div className={classNames(styles.item, styles.comment)}>
        {/* DEBUG */}
        (Other parameters...)
      </div>
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
    remark,
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
        <EditableNode
          // prettier-ignore
          nodeId={`${questionId}-remark`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          textClassName={styles.remark}
        />
        <EditSurveyQuestionContent questionData={questionData} />
      </SurveyNodeContent>
    </SurveyNode>
  );
};
