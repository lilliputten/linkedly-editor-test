import React from 'react';
import classNames from 'classnames';
import { PageTitle } from 'src/components/MUI';

import { TSurvey } from 'src/entities/Survey/types';
import { ViewSurveyPage } from 'src/components/Survey/ViewSurvey/ViewSurveyPage';
import { SurveyNode, SurveyNodeContent } from 'src/components/Survey/SurveyNode';

interface TViewSurveyProps {
  surveyData: TSurvey;
  className?: string;
}

export const ViewSurveyRoot: React.FC<TViewSurveyProps> = (props) => {
  const { surveyData, className } = props;
  const { id: surveyId, name, pages } = surveyData;
  // TODO: Sort pages
  const title = name || `Survery ${surveyId}`;
  return (
    <SurveyNode
      nodeType="root"
      nodeId={surveyId}
      className={classNames(className)}
      root
      // indent
    >
      <PageTitle mb={3}>{title}</PageTitle>
      <SurveyNodeContent nodeType="root-content" root>
        {/*
        <pre>{JSON.stringify(surveyData, null, 2)}</pre>
        */}
        {pages.map((pageData) => {
          return <ViewSurveyPage key={pageData.pageId} pageData={pageData} />;
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
