import React from 'react';
import classNames from 'classnames';
import { Stack } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { TSequence } from 'src/entities/Sequence/types';
import { ShowSequenceSection } from '../ShowSequenceSection';

export interface TShowSequenceRootProps extends TPropsWithClassName {
  sequenceData: TSequence;
}

export const ShowSequenceRoot: React.FC<TShowSequenceRootProps> = (props) => {
  const {
    // prettier-ignore
    className,
    sequenceData,
  } = props;
  const {
    // prettier-ignore
    id: sequenceId,
    items: sections,
  } = sequenceData;
  return (
    <Stack
      // prettier-ignore
      data-sequence-id={sequenceId}
      className={classNames(className, 'ShowSequenceRoot')}
      direction="column"
    >
      {sections.map((sectionData) => {
        return <ShowSequenceSection key={sectionData.sectionId} sectionData={sectionData} />;
      })}
    </Stack>
  );
};
