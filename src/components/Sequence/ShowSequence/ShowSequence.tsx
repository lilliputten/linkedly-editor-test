import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequence } from 'src/entities/Sequence/types';
import { ShowSequenceSection } from '../ShowSequenceSection';
// import { ShowSequenceRoot } from 'src/components/Sequence/ShowSequence';

export interface TShowSequenceProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  sequenceData: TSequence;
}

export const ShowSequence: React.FC<TShowSequenceProps> = (props) => {
  const {
    className,
    // handleChange,
    sequenceData,
  } = props;
  const {
    // prettier-ignore
    id: sequenceId,
    items: sections,
    // orderNumber,
  } = sequenceData;
  return (
    <Scrollable
      data-sequence-id={sequenceId}
      className={classNames(className, 'ShowSequenceSection')}
      fullCenter={false}
    >
      <Container maxWidth="md" sx={{ my: 1 }}>
        {sections.map((sectionData) => {
          return <ShowSequenceSection sectionData={sectionData} />;
        })}
        <pre>{JSON.stringify(sequenceData, null, 2)}</pre>
        {/*
        <ShowSequenceSectionRoot
          // prettier-ignore
          sequenceData={sequenceData}
          onChange={handleChange}
        />
        */}
      </Container>
    </Scrollable>
  );
};
