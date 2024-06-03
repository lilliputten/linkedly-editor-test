import { observer } from 'mobx-react-lite';
import { EditSurveyQuestion } from 'src/components/Survey/EditSurvey';

import { TDemoComponent } from 'src/core/types';
import { TSurveyQuestion, TSurveySection } from 'src/entities/Survey/types';

export const DemoEditSurveyItems: TDemoComponent = observer(() => {
  const questionData: TSurveyQuestion = {
    questionId: 2,
    typeId: 1,
    orderNumber: 2,
    displayNumber: '1.3.',
    // text: 'Fake question',
    text: 'Fake question with an extra long text data to check flex adaptive layout',
    remark:
      'By "adding" new fields, you will automatically import references entered in previous years. If field is empty, please complete it with relevant reference.',
  };
  const sectionData: TSurveySection = {
    sectionId: 18709239,
    orderNumber: 1,
    displayNumber: '1.',
    name: 'Contact Information',
    remark:
      'Note: all information provided throughout this survey should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
    items: [questionData],
  };
  return (
    <div className="DemoEditSurveyItems">
      <EditSurveyQuestion
        // prettier-ignore
        questionData={questionData}
      />
      {/*
      <EditSurveySection
        // prettier-ignore
        sectionData={sectionData}
      />
      */}
    </div>
  );
});

DemoEditSurveyItems.__title = 'Edit Survey Items';
