import { TDemoComponent } from 'src/core/types';
import {
  EditCampaignPage,
  EditCampaignQuestion,
  EditCampaignSection,
} from 'src/components/Campaign/EditCampaign';
import { TCampaignPage, TCampaignQuestion, TCampaignSection } from 'src/entities/Campaign/types';

/** Which demos to show? */
const show = {
  page: true,
  section: false,
  question: false,
};

export const DemoEditCampaignItems: TDemoComponent = () => {
  const questionData: TCampaignQuestion = {
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
  const sectionData: TCampaignSection = {
    sectionId: 18709239,
    orderNumber: 1,
    displayNumber: '1.',
    name: 'Contact Information',
    remark:
      'Note: all information provided throughout this campaign should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
    items: [questionData],
  };
  const pageData: TCampaignPage = {
    pageId: 7463886,
    name: 'Test page',
    orderNumber: 1,
    items: [sectionData],
  };
  return (
    <div className="DemoEditCampaignItems">
      {/*
       */}
      {show.question && (
        <EditCampaignQuestion
          // prettier-ignore
          questionData={questionData}
        />
      )}
      {show.section && (
        <EditCampaignSection
          // prettier-ignore
          sectionData={sectionData}
        />
      )}
      {show.page && (
        <EditCampaignPage
          // prettier-ignore
          pageData={pageData}
        />
      )}
    </div>
  );
};

DemoEditCampaignItems.__title = 'Edit Campaign Items';
