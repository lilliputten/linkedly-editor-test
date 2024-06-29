import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequence } from 'src/entities/Sequence/types';
import { ShowSequence } from 'src/components/Sequence/ShowSequence';

export interface TShowSequenceWrapperProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  sequenceData: TSequence;
}

export const ShowSequenceWrapper: React.FC<TShowSequenceWrapperProps> = observer((props) => {
  const { className, sequenceData } = props;
  return (
    <Scrollable className={classNames(className, 'ShowSequenceWrapper')} fullCenter={false}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        <ShowSequence
          // prettier-ignore
          sequenceData={sequenceData}
          // onChange={handleChange}
        />
      </Container>
    </Scrollable>
  );
});
