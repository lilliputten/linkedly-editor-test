import React from 'react';

import { TDemoComponent } from 'src/core/types';
import { EditSequenceRoot } from 'src/components/Sequence/EditSequence';
import {
  TSequence,
  TSequenceNodeChangeParams,
  TSequencePage,
  TSequenceElement,
  TSequenceSection,
} from 'src/entities/Sequence/types';

const defaultSequenceElementData: TSequenceElement = {
  sequenceElementId: 2,
  typeId: 1,
  orderNumber: 2,
  displayNumber: '1.3.',
  // text: 'Fake sequence',
  text: 'Fake sequence with an extra long text data to check flex adaptive layout',
  remark:
    'By "adding" new fields, you will automatically import references entered in previous years. If field is empty, please complete it with relevant reference.',
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultSectionData: TSequenceSection = {
  sectionId: 18709239,
  orderNumber: 1,
  displayNumber: '1.',
  name: 'Contact Information',
  remark:
    'Note: all information provided throughout this sequence should describe the situation as of the date of completion. Future policy initiatives should be listed under Section 9 - Future plans.',
  items: [defaultSequenceElementData],
};
const defaultPageData: TSequencePage = {
  pageId: 7463886,
  name: 'Test page',
  orderNumber: 1,
  items: [defaultSectionData],
};
const defaultSequenceData: TSequence = {
  id: 111,
  name: 'Minimal sequence sample',
  items: [defaultPageData],
};

export const DemoEditSequence: TDemoComponent = () => {
  const [sequenceData, setSequenceData] = React.useState<TSequence>(defaultSequenceData);
  const handleChange = React.useCallback((params: TSequenceNodeChangeParams) => {
    const {
      nodeData, // {id: 111, name: 'Minimal sequence sample', items: Array(1)}
      // nodeId, // 111
      // value, // [{…}]
      // valueId, // "items"
    } = params;

    setSequenceData(nodeData as TSequence);
  }, []);
  return (
    <div className="DemoEditSequence">
      <EditSequenceRoot
        // prettier-ignore
        sequenceData={sequenceData}
        onChange={handleChange}
      />
    </div>
  );
};

DemoEditSequence.__title = 'Edit Sequence';
