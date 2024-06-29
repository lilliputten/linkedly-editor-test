import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Box, Stack, Typography } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { useAppDataStore } from 'src/store/AppDataStore';

export interface TMainChartWrapperProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  // sequenceData: TSequence;
  // hasChanged?: boolean;
}

export const MainChartWrapper: React.FC<TMainChartWrapperProps> = observer((props) => {
  const { className } = props;
  const appDataStore = useAppDataStore();
  const { sequenceData, hasSequenceDataChanged } = appDataStore;
  const hasData = !!sequenceData;
  return (
    <Stack className={classNames(className, 'MainChartWrapper')}>
      {hasData && (
        <>
          {hasSequenceDataChanged && (
            <Box>
              <Typography color="red">
                {/* Notification about data change */}
                The sequence data has changed. Saving will be required.
              </Typography>
            </Box>
          )}
          <>Main content</>
        </>
      )}
    </Stack>
  );
});
