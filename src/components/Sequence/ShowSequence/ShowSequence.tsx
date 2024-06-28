import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequence } from 'src/entities/Sequence/types';
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
  // const {
  //   // prettier-ignore
  //   id: sequenceId,
  //   // orderNumber,
  // } = sequenceData;
  return (
    <Scrollable className={classNames(className, 'ShowSequence')} fullCenter={false}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        <pre>{JSON.stringify(sequenceData, null, 2)}</pre>
        {/*
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
