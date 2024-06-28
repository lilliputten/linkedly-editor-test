import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequenceSection } from 'src/entities/Sequence/types';
import { ShowSequenceItem } from '../ShowSequenceItem';
// import { ShowSequenceSectionRoot } from 'src/components/Sequence/ShowSequenceSection';

export interface TShowSequenceSectionProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  sectionData: TSequenceSection;
}

export const ShowSequenceSection: React.FC<TShowSequenceSectionProps> = (props) => {
  const {
    className,
    // handleChange,
    sectionData,
  } = props;
  const {
    // prettier-ignore
    sectionId,
    items,
    // orderNumber,
  } = sectionData;
  return (
    <Scrollable
      data-section-id={sectionId}
      className={classNames(className, 'ShowSection')}
      fullCenter={false}
    >
      <Container maxWidth="md" sx={{ my: 1 }}>
        {items.map((itemData) => {
          return <ShowSequenceItem itemData={itemData} />;
        })}
        {/*
        <pre>{JSON.stringify(sectionData, null, 2)}</pre>
        <ShowSequenceRoot
          // prettier-ignore
          sequenceData={sequenceData}
          onChange={handleChange}
        />
        */}
      </Container>
    </Scrollable>
  );
};
