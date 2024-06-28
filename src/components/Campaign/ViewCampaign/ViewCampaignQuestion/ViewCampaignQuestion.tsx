import React from 'react';
import classNames from 'classnames';

import { TCampaignQuestion } from 'src/entities/Campaign/types';
import {
  CampaignNode,
  CampaignNodeFoldedContent,
  CampaignNodeRemark,
  CampaignNodeTitle,
} from 'src/components/Campaign/CampaignNode';
import { getQuestionTypeName } from 'src/entities/Campaign/helpers';
import { CampaignNodeHeader } from 'src/components/Campaign/CampaignNode/CampaignNodeHeader';

import styles from './ViewCampaignQuestion.module.scss';

interface TViewCampaignQuestionProps {
  questionData: TCampaignQuestion;
  className?: string;
}

/** DEBUG: Show plain question data */
const debugShowRawQuestion = false;

export const ViewCampaignQuestionContent: React.FC<{ questionData: TCampaignQuestion }> = (
  props,
) => {
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
      {/*
      <CampaignNodeTitle>Question {questionId}</CampaignNodeTitle>
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

export const ViewCampaignQuestion: React.FC<TViewCampaignQuestionProps> = (props) => {
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
  return (
    <CampaignNode
      nodeType="question"
      nodeId={questionId}
      className={classNames(className, styles.root)}
      indent
    >
      <CampaignNodeHeader
        // prettier-ignore
        prefix={displayNumber}
        title={text}
        icon="[ICON]"
        toolbar="[TOOLBAR]"
      />
      {remark && <CampaignNodeRemark>{remark}</CampaignNodeRemark>}
      <CampaignNodeFoldedContent nodeBaseType="question-content" className={styles.nodeContent}>
        <ViewCampaignQuestionContent questionData={questionData} />
      </CampaignNodeFoldedContent>
    </CampaignNode>
  );
};
