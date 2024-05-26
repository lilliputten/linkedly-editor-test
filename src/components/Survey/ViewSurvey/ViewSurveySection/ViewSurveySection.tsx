import React from 'react';
import classNames from 'classnames';
import { Stack, Typography } from '@mui/material';

import { TSurveySection } from 'src/entities/Survey/types';
import { ViewSurveyQuestion } from 'src/components/Survey/ViewSurvey/ViewSurveyQuestion';
import {
  SurveyNode,
  SurveyNodeContent,
  SurveyNodeRemark,
  SurveyNodeTitle,
} from 'src/components/Survey/SurveyNode';

interface TViewSurveySectionProps {
  sectionData: TSurveySection;
  className?: string;
}

export const ViewSurveySection: React.FC<TViewSurveySectionProps> = (props) => {
  const { sectionData, className } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    sectionName,
    sectionRemark,
    questions,
  } = sectionData;
  // TODO: Sort questions
  const hasTitle = !!(sectionName || sectionRemark);
  return (
    <SurveyNode nodeType="section" nodeId={sectionId} className={classNames(className)}>
      {hasTitle && (
        <Stack className="ViewSurveySection-Title">
          {sectionName && <SurveyNodeTitle>Section: {sectionName}</SurveyNodeTitle>}
          {sectionRemark && <SurveyNodeRemark>{sectionRemark}</SurveyNodeRemark>}
        </Stack>
      )}
      {/*
      <pre>{JSON.stringify(sectionData, null, 2)}</pre>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
      */}
      <SurveyNodeContent nodeType="section-content">
        {questions.map((questionData) => {
          return <ViewSurveyQuestion key={questionData.questionId} questionData={questionData} />;
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
