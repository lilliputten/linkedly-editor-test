import * as React from 'react';
import { Stack } from '@mui/material';
import classNames from 'classnames';

import { useCampaignNodeSx } from './hooks';
import { TCampaignNodeBaseProps } from './types';

export const CampaignNodeBase: React.FC<TCampaignNodeBaseProps> = (props) => {
  const {
    // prettier-ignore
    nodeType,
    nodeBaseType,
    nodeId,
    children,
    className,
    sx,
    root,
    indent = false,
    ...restProps
  } = props;
  const surveyNodeSx = useCampaignNodeSx({ root, indent });
  return (
    <Stack
      // prettier-ignore
      className={classNames(className)}
      data-node-id={nodeId}
      data-node-type={nodeType}
      data-node-base-type={nodeBaseType}
      sx={{ ...surveyNodeSx, ...sx }}
      spacing={0.5}
      py={1}
      {...restProps}
    >
      {children}
    </Stack>
  );
};
