import React from 'react';
import classNames from 'classnames';

import { TSurveyItem, TSurveySection } from 'src/entities/Survey/types';
import { ViewSurveyQuestion } from 'src/components/Survey/ViewSurvey/ViewSurveyQuestion';
import { SurveyNode, SurveyNodeContent, SurveyNodeRemark } from 'src/components/Survey/SurveyNode';
import { useSortedSurveyItems } from 'src/components/Survey/SurveyNode/hooks';
import { SurveyNodeHeader } from 'src/components/Survey/SurveyNode/SurveyNodeHeader';

interface TViewSurveySectionProps {
  sectionData: TSurveySection;
  className?: string;
}

type TSurveyItemProps = { itemData: TSurveyItem };

/** Render folderd section or question */
const ViewSurveyItem: React.FC<TSurveyItemProps> = ({ itemData }) => {
  const isQuestion = !!itemData.questionId;
  if (isQuestion) {
    return <ViewSurveyQuestion questionData={itemData} />;
  } else {
    return <ViewSurveySection sectionData={itemData} />;
  }
};

export const ViewSurveySection: React.FC<TViewSurveySectionProps> = (props) => {
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
          return (
            <ViewSurveyItem key={itemData.sectionId || itemData.questionId} itemData={itemData} />
          );
        })}
      </SurveyNodeContent>
    </SurveyNode>
  );
};
