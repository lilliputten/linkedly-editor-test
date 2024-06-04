import React from 'react';
import classNames from 'classnames';

import { TSurveyPage } from 'src/entities/Survey/types';
import { EditSurveySection } from 'src/components/Survey/EditSurvey/EditSurveySection';
import { SurveyNode, SurveyNodeFoldedContent } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

interface TEditSurveyPageProps {
  pageData: TSurveyPage;
  className?: string;
}

export const EditSurveyPage: React.FC<TEditSurveyPageProps> = (props) => {
  const { pageData, className } = props;
  const { pageId, sections } = pageData;
  // Sort sections
  const sortedSections = useSortedSurveyItems(sections);
  return (
    <SurveyNode nodeType="page" nodeId={pageId} className={classNames(className)}>
      <SurveyNodeHeader
        // prettier-ignore
        title={pageId}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />

      <SurveyNodeFoldedContent nodeBaseType="page-content" indent>
        {sortedSections.map((sectionData) => {
          return <EditSurveySection key={sectionData.sectionId} sectionData={sectionData} />;
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
