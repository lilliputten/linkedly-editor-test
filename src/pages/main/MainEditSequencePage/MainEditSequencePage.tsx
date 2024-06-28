import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Box, Container, Typography } from '@mui/material';

import { isDev } from 'src/core/constants/config';
import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TPropsWithClassName } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';
import { useLogged } from 'src/store/AppSessionStore';
import { TSequenceId, TSequence, TSequenceNodeChangeParams } from 'src/entities/Sequence/types';
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
