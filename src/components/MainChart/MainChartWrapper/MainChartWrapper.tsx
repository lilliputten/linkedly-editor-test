import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Alert, Stack } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { useAppDataStore } from 'src/store/AppDataStore';
import { FlowChart } from 'src/components/MainChart/FlowChart';

export const MainChartWrapper: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const { sequenceData, hasSequenceDataChanged } = appDataStore;
  const hasData = !!sequenceData;
  return (
    <Stack className={classNames(className, 'MainChartWrapper')} flex={1} overflow="hidden">
      {hasData && (
        <>
          {hasSequenceDataChanged && (
            <Alert severity="info">
              The sequence data has been changed. Saving will be required.
            </Alert>
          )}
          {hasData && <FlowChart />}
        </>
      )}
    </Stack>
  );
});
