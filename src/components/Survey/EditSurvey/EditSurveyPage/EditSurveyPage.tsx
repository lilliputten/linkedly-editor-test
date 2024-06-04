import React from 'react';
import classNames from 'classnames';

import { TSurveyPage } from 'src/entities/Survey/types';
import { EditSurveySection } from 'src/components/Survey/EditSurvey/EditSurveySection';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
} from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';
import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

interface TEditSurveyPageProps {
  pageData: TSurveyPage;
  className?: string;
}

const EditSurveyPageContent: React.FC<{ pageData: TSurveyPage }> = (props) => {
  const { pageData } = props;
  const {
    // prettier-ignore
    pageId,
    // remark,
  } = pageData;
  return (
    <>
      <SurveyNodeItemRow title="ID:" activeButtonId={`page-${pageId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`page-${pageId}-id`}
          nodeId={`page-${pageId}-id`}
          activeButtonId={`page-${pageId}-id-button`}
          editableType="text"
          title="Page ID"
          value={pageId || ''}
          flex={1}
          wrap
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveyPage: React.FC<TEditSurveyPageProps> = (props) => {
  const { pageData, className } = props;
  const { pageId, name, sections } = pageData;
  // Sort sections
  const sortedSections = useSortedSurveyItems(sections);
  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`page-${pageId}-name`}
        editableType="text"
        title="Page Name"
        value={name || ''}
        flex={1}
      />
    );
  }, [pageId, name]);
  return (
    <SurveyNode nodeType="page" nodeId={pageId} className={classNames(className)}>
      <SurveyNodeHeader
        // prettier-ignore
        title={nameNode}
        icon="[PAGE]"
        toolbar="[TOOLBAR]"
      />
      <SurveyNodeOwnContent nodeBaseType="page-own-content">
        <EditSurveyPageContent pageData={pageData} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="page-content" indent>
        {sortedSections.map((sectionData) => {
          return <EditSurveySection key={sectionData.sectionId} sectionData={sectionData} />;
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
