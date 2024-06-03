import React from 'react';
import classNames from 'classnames';

import { TSurveyItem, TSurveyQuestion, TSurveySection } from 'src/entities/Survey/types';
import { EditSurveyQuestion } from 'src/components/Survey/EditSurvey/EditSurveyQuestion';
import { SurveyNode, SurveyNodeContent, SurveyNodeRemark } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

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

export const EditSurveySection: React.FC<TEditSurveySectionProps> = (props) => {
  const { sectionData, className } = props;
  const {
    sectionId,
    // orderNumber,
    // displayNumber,
    name,
    remark,
    items,
  } = sectionData;
  // Sort items
  const sortedItems = useSortedSurveyItems(items);
  return (
    <SurveyNode nodeType="section" nodeId={sectionId} className={classNames(className)}>
      <SurveyNodeHeader
        // prettier-ignore
        // prefix={displayNumber}
        title={name}
        icon="[SECTION]"
        toolbar="[TOOLBAR]"
      />
      {remark && <SurveyNodeRemark>{remark}</SurveyNodeRemark>}
      <SurveyNodeContent nodeBaseType="section-content" indent>
        {sortedItems.map((itemData) => {
          const key =
            (itemData as TSurveyQuestion).questionId || (itemData as TSurveySection).sectionId;
          return <EditSurveyItem key={key} itemData={itemData} />;
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
