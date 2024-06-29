import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Box, Stack, Typography } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { useAppDataStore } from 'src/store/AppDataStore';
import { dragSequenceItemFormatId } from 'src/entities/Sequence/constants';
import { TSequenceItem } from 'src/entities/Sequence/types';

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
  const onDragOver = React.useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = React.useCallback((event: any) => {
    event.preventDefault();
    const dataJson = event.dataTransfer.getData(dragSequenceItemFormatId);
    const itemData = dataJson ? (JSON.parse(dataJson) as TSequenceItem) : undefined;

    console.log('[MainChartWrapper:onDrop]', {
      itemData,
    });

    // Check if the dropped element is valid
    if (!itemData?.itemId) {
      return;
    }

    /* // TODO: Add new node to a chart
     * // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
     * // and you don't need to subtract the reactFlowBounds.left/top anymore
     * // details: https://reactflow.dev/whats-new/2023-11-10
     * // @ts-ignore
     * const position = reactFlowInstance.screenToFlowPosition({
     *   x: event.clientX,
     *   y: event.clientY,
     * });
     * const newNode = {
     *   id: getId(),
     *   type: data.type,
     *   position,
     *   data: {
     *     state: {
     *       task: data.name,
     *       transitions: {
     *         success: "end",
     *         fail: "end"
     *       }
     *     },
     *     campaignStatus: campaign.status,
     *     label: data.label,
     *   }
     * };
     * setNodes((nds) => { return nds.concat(newNode) });
     */
  }, []);

  return (
    <Stack
      // prettier-ignore
      className={classNames(className, 'MainChartWrapper')}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
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
          <>Main chart</>
        </>
      )}
    </Stack>
  );
});
