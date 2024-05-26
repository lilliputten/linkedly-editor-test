import React from 'react';
import classNames from 'classnames';

import { TSurveySection } from 'src/entities/Survey/types';
import { ViewSurveyQuestion } from 'src/components/Survey/ViewSurvey/ViewSurveyQuestion';
import { SurveyNode, SurveyNodeContent, SurveyNodeRemark } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

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
  // Sort questions
  const sortedQuestions = useSortedSurveyItems(questions);
  // const hasTitle = !!(sectionName || sectionRemark);
  return (
    <SurveyNode nodeType="section" nodeId={sectionId} className={classNames(className)}>
      {/*
      {hasTitle && (
        <Stack className="ViewSurveySection-Title">
          {sectionName && <SurveyNodeTitle>Section: {sectionName}</SurveyNodeTitle>}
          {sectionRemark && <SurveyNodeRemark>{sectionRemark}</SurveyNodeRemark>}
        </Stack>
      )}
      */}
      <SurveyNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={sectionName}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      {sectionRemark && <SurveyNodeRemark>{sectionRemark}</SurveyNodeRemark>}
      {/*
      <pre>{JSON.stringify(sectionData, null, 2)}</pre>
      <pre>{JSON.stringify(sortedQuestions, null, 2)}</pre>
      */}
      <SurveyNodeContent nodeBaseType="section-content" indent>
        {sortedQuestions.map((questionData) => {
          return <ViewSurveyQuestion key={questionData.questionId} questionData={questionData} />;
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
