import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { ShowSequenceRoot } from 'src/components/Sequence/ShowSequenceRoot';
import { useAppDataStore } from 'src/store/AppDataStore';

export interface TShowSequenceWrapperProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  // sequenceData: TSequence;
}

export const ShowSequenceWrapper: React.FC<TShowSequenceWrapperProps> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const { sequenceData } = appDataStore;
  const hasData = !!sequenceData;
  return (
    <Scrollable className={classNames(className, 'ShowSequenceWrapper')} fullCenter={false}>
      <Container maxWidth="md" sx={{ my: 2 }}>
        {hasData && (
          <ShowSequenceRoot
            // prettier-ignore
            sequenceData={sequenceData}
            // onChange={handleChange}
          />
        )}
      </Container>
    </Scrollable>
  );
});
