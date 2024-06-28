import { TDemoComponent } from 'src/core/types';
import {
  EditSequencePage,
  EditSequenceElement,
  EditSequenceSection,
} from 'src/components/Sequence/EditSequence';
import { TSequencePage, TSequenceElement, TSequenceSection } from 'src/entities/Sequence/types';

/** Which demos to show? */
const show = {
  page: true,
  section: false,
  sequenceElement: false,
};

export const DemoEditSequenceItems: TDemoComponent = () => {
  const SequenceElementData: TSequenceElement = {
    sequenceElementId: 2,
    typeId: 1,
    orderNumber: 2,
    creditsCount: 3,
    // text: 'Fake sequence',
    text: 'Fake sequence with an extra long text data to check flex adaptive layout',
    remark:
      'By "adding" new fields, you will automatically import references entered in previous years. If field is empty, please complete it with relevant reference.',
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sectionData: TSequenceSection = {
    sectionId: 18709239,
    orderNumber: 1,
    name: 'Contact Information',
    remark:
      'Note: all information provided throughout this sequence should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
    items: [SequenceElementData],
  };
  const pageData: TSequencePage = {
    pageId: 7463886,
    name: 'Test page',
    orderNumber: 1,
    items: [sectionData],
  };
  return (
    <div className="DemoEditSequenceItems">
      {/*
       */}
      {show.sequenceElement && (
        <EditSequenceElement
          // prettier-ignore
          SequenceElementData={SequenceElementData}
        />
      )}
      {show.section && (
        <EditSequenceSection
          // prettier-ignore
          sectionData={sectionData}
        />
      )}
      {show.page && (
        <EditSequencePage
          // prettier-ignore
          pageData={pageData}
        />
      )}
    </div>
  );
};

DemoEditSequenceItems.__title = 'Edit Sequence Items';
