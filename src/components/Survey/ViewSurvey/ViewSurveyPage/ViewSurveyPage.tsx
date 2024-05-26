import React from 'react';
import classNames from 'classnames';

import { TSurveyPage } from 'src/entities/Survey/types';
import { ViewSurveySection } from 'src/components/Survey/ViewSurvey/ViewSurveySection';
import { SurveyNode, SurveyNodeContent, SurveyNodeTitle } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';

interface TViewSurveyPageProps {
  pageData: TSurveyPage;
  className?: string;
}

export const ViewSurveyPage: React.FC<TViewSurveyPageProps> = (props) => {
  const { pageData, className } = props;
  const { pageId, sections } = pageData;
  // Sort sections
  const sortedSections = useSortedSurveyItems(sections);
  return (
    <SurveyNode
      nodeType="page"
      nodeId={pageId}
      className={classNames(className)}
      // data-page-id={String(pageId)}
    >
      <SurveyNodeContent nodeType="page-content">
        <SurveyNodeTitle>Page {pageId}</SurveyNodeTitle>
        {/*
        <pre>{JSON.stringify(sections, null, 2)}</pre>
        */}
        {sortedSections.map((sectionData) => {
          return <ViewSurveySection key={sectionData.sectionId} sectionData={sectionData} />;
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
