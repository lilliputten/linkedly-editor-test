import React from 'react';
import classNames from 'classnames';
import { PageTitle } from 'src/components/MUI';

import { TSurvey } from 'src/entities/Survey/types';
import { ViewSurveyPage } from 'src/components/Survey/ViewSurvey/ViewSurveyPage';
import { SurveyNode, SurveyNodeFoldedContent } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';

interface TViewSurveyProps {
  surveyData: TSurvey;
  className?: string;
}

export const ViewSurveyRoot: React.FC<TViewSurveyProps> = (props) => {
  const { surveyData, className } = props;
  const { id: surveyId, name, items } = surveyData;
  // Sort pages
  const sortedPages = useSortedSurveyItems(items);
  const title = name || `Survey ${surveyId}`;
  return (
    <SurveyNode
      nodeType="root"
      nodeId={surveyId}
      className={classNames(className)}
      root
      spacing={2}
      // indent
    >
      <PageTitle>{title}</PageTitle>
      <SurveyNodeFoldedContent nodeBaseType="root-content" root>
        {/*
        <pre>{JSON.stringify(surveyData, null, 2)}</pre>
        */}
        {sortedPages.map((pageData) => {
          return <ViewSurveyPage key={pageData.pageId} pageData={pageData} />;
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
