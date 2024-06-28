import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequence, TSequenceNodeChangeParams } from 'src/entities/Sequence/types';
import { EditSequenceRoot } from 'src/components/Sequence/EditSequence';

export interface TMainEditSequencePageProps extends TPropsWithClassName {
  handleChange: (params: TSequenceNodeChangeParams) => void;
  sequenceData: TSequence;
}

export const MainEditSequencePage: React.FC<TMainEditSequencePageProps> = observer((props) => {
  const { className, handleChange, sequenceData } = props;
  return (
    <Scrollable className={classNames(className, 'MainEditSequencePage')}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        <EditSequenceRoot
          // prettier-ignore
          sequenceData={sequenceData}
          onChange={handleChange}
        />
      </Container>
    </Scrollable>
  );
});
