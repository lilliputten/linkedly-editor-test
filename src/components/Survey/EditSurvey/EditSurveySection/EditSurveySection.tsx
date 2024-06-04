import React from 'react';
import classNames from 'classnames';

import { TSurveyItem, TSurveyQuestion, TSurveySection } from 'src/entities/Survey/types';
import { EditSurveyQuestion } from 'src/components/Survey/EditSurvey/EditSurveyQuestion';
import {
  SurveyNode,
  SurveyNodeFoldedContent,
  SurveyNodeItemRow,
  SurveyNodeOwnContent,
  // SurveyNodeRemark,
} from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';
import { EditableNode } from 'src/components/Survey/EditableNode/EditableNode';

interface TEditSurveySectionProps {
  sectionData: TSurveySection;
  className?: string;
}

type TSurveyItemProps = { itemData: TSurveyItem };

/** Render folderd section or question */
const EditSurveyItem: React.FC<TSurveyItemProps> = ({ itemData }) => {
  const isQuestion = !!(itemData as TSurveyQuestion).questionId;
  if (isQuestion) {
    return <EditSurveyQuestion questionData={itemData as TSurveyQuestion} />;
  } else {
    return <EditSurveySection sectionData={itemData as TSurveySection} />;
  }
};

const EditSurveySectionContent: React.FC<{ sectionData: TSurveySection }> = (props) => {
  const { sectionData } = props;
  const {
    // prettier-ignore
    sectionId,
    remark,
  } = sectionData;
  return (
    <>
      <SurveyNodeItemRow title="ID:" activeButtonId={`section-${sectionId}-id-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-id`}
          nodeId={`section-${sectionId}-id`}
          activeButtonId={`section-${sectionId}-id-button`}
          editableType="text"
          title="Section ID"
          value={sectionId || ''}
          flex={1}
          wrap
        />
      </SurveyNodeItemRow>
      <SurveyNodeItemRow title="Remark:" activeButtonId={`section-${sectionId}-remark-button`}>
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-remark`}
          nodeId={`section-${sectionId}-remark`}
          activeButtonId={`section-${sectionId}-remark-button`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          // textClassName={styles.remark}
        />
      </SurveyNodeItemRow>
    </>
  );
};

export const EditSurveySection: React.FC<TEditSurveySectionProps> = (props) => {
  const { sectionData, className } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    name,
    // remark,
    items,
  } = sectionData;
  // Sort items
  const sortedItems = useSortedSurveyItems(items);
  const nameNode = React.useMemo(() => {
    return (
      <EditableNode
        // prettier-ignore
        nodeId={`section-${sectionId}-name`}
        editableType="text"
        title="Section Name"
        value={name}
        flex={1}
      />
    );
  }, [sectionId, name]);
  return (
    <SurveyNode nodeType="section" nodeId={sectionId} className={classNames(className)} indent>
      <SurveyNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={nameNode}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      {/*
      {remark && <SurveyNodeRemark>{remark}</SurveyNodeRemark>}
      */}
      <SurveyNodeOwnContent nodeBaseType="section-own-content">
        <EditSurveySectionContent sectionData={sectionData} />
      </SurveyNodeOwnContent>
      <SurveyNodeFoldedContent nodeBaseType="section-content">
        {/* // XXX: To show remark here or below the header?
        <EditableNode
          // prettier-ignore
          key={`section-${sectionId}-remark`}
          nodeId={`section-${sectionId}-remark`}
          editableType="textarea"
          title="Remark Text"
          value={remark || ''}
          flex={1}
          wrap
          textClassName={styles.remark}
        />
        */}
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TSurveyQuestion).questionId || (itemData as TSurveySection).sectionId;
          return <EditSurveyItem key={key} itemData={itemData} />;
        })}
      </SurveyNodeFoldedContent>
    </SurveyNode>
  );
};
