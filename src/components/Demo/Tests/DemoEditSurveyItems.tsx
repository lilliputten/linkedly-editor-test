import { observer } from 'mobx-react-lite';
import {
  EditSurveyPage,
  EditSurveyQuestion,
  EditSurveySection,
} from 'src/components/Survey/EditSurvey';

import { TDemoComponent } from 'src/core/types';
import { TSurveyPage, TSurveyQuestion, TSurveySection } from 'src/entities/Survey/types';

/** Which demos to show? */
const show = {
  page: true,
  section: false,
  question: false,
};

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sectionData: TSurveySection = {
    sectionId: 18709239,
    orderNumber: 1,
    displayNumber: '1.',
    name: 'Contact Information',
    remark:
      'Note: all information provided throughout this survey should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
    items: [questionData],
  };
  const pageData: TSurveyPage = {
    pageId: 7463886,
    orderNumber: 1,
    items: [sectionData],
  };
  return (
    <div className="DemoEditSurveyItems">
      {/*
       */}
      {show.question && (
        <EditSurveyQuestion
          // prettier-ignore
          questionData={questionData}
        />
      )}
      {show.section && (
        <EditSurveySection
          // prettier-ignore
          sectionData={sectionData}
        />
      )}
      {show.page && (
        <EditSurveyPage
          // prettier-ignore
          pageData={pageData}
        />
      )}
    </div>
  );
});

DemoEditSurveyItems.__title = 'Edit Survey Items';
