import React from 'react';
import classNames from 'classnames';
import { Stack } from '@mui/material';

import { TSurveyQuestion } from 'src/entities/Survey/types';
import {
  SurveyNode,
  SurveyNodeContent,
  SurveyNodeRemark,
  SurveyNodeTitle,
} from 'src/components/Survey/SurveyNode';

interface TViewSurveyQuestionProps {
  questionData: TSurveyQuestion;
  className?: string;
}

export const ViewSurveyQuestion: React.FC<TViewSurveyQuestionProps> = (props) => {
  const { questionData, className } = props;
  const {
    // prettier-ignore
    questionId,
    typeId,
    orderNumber,
    displayNumber,
    questionText,
    remark,
  } = questionData;
  // TODO: Provide survey data?
  // prettier-ignore
  return (
    <SurveyNode nodeType="question" nodeId={questionId} className={classNames(className)} indent>
      <SurveyNodeContent nodeType="question-content">
        <SurveyNodeTitle>Question {questionId}</SurveyNodeTitle>
        {/*
        <pre>{JSON.stringify(questions, null, 2)}</pre>
        */}
        <div><strong>typeId:</strong> {typeId}</div>
        <div><strong>orderNumber:</strong> {orderNumber}</div>
        <div><strong>displayNumber:</strong> {displayNumber}</div>
        <div><strong>questionText:</strong> {questionText}</div>
        <div><strong>remark:</strong> {remark}</div>
      </SurveyNodeContent>
    </SurveyNode>
  );
};
