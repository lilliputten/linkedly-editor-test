import React from 'react';

import { TDemoComponent } from 'src/core/types';
import { EditSurveyRoot } from 'src/components/Survey/EditSurvey';
import {
  TSurvey,
  TSurveyNodeChangeParams,
  TSurveyPage,
  TSurveyQuestion,
  TSurveySection,
} from 'src/entities/Survey/types';

const defaultQuestionData: TSurveyQuestion = {
  questionId: 2,
  typeId: 1,
  orderNumber: 2,
  displayNumber: '1.3.',
  // text: 'Fake question',
  text: 'Fake question with an extra long text data to check flex adaptive layout',
  remark:
    'By "adding" new fields, you will automatically import references entered in previous years. If field is empty, please complete it with relevant reference.',
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultSectionData: TSurveySection = {
  sectionId: 18709239,
  orderNumber: 1,
  displayNumber: '1.',
  name: 'Contact Information',
  remark:
    'Note: all information provided throughout this survey should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
  items: [defaultQuestionData],
};
const defaultPageData: TSurveyPage = {
  pageId: 7463886,
  name: 'Test page',
  orderNumber: 1,
  items: [defaultSectionData],
};
const defaultSurveyData: TSurvey = {
  id: 111,
  name: 'Minimal survey sample',
  items: [defaultPageData],
};

export const DemoEditSurvey: TDemoComponent = () => {
  const [surveyData, setSurveyData] = React.useState<TSurvey>(defaultSurveyData);
  const handleChange = React.useCallback((params: TSurveyNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal survey sample', items: Array(1)}
      nodeId, // 111
      value, // [{…}]
      valueId, // "items"
    } = params;
    console.log('[DemoEditSurvey:handleChange]', {
      nodeData,
      nodeId,
      value,
      valueId,
      params,
      defaultSurveyData,
    });
    // debugger;
    setSurveyData(nodeData as TSurvey);
  }, []);
  return (
    <div className="DemoEditSurvey">
      <EditSurveyRoot
        // prettier-ignore
        surveyData={surveyData}
        onChange={handleChange}
      />
    </div>
  );
};

DemoEditSurvey.__title = 'Edit Survey';
