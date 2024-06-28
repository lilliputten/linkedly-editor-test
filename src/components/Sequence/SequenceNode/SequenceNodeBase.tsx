import * as React from 'react';
import { Stack } from '@mui/material';
import classNames from 'classnames';

import { useSequenceNodeSx } from './hooks';
import { TSequenceNodeBaseProps } from './types';

export const SequenceNodeBase: React.FC<TSequenceNodeBaseProps> = (props) => {
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
  const sequenceNodeSx = useSequenceNodeSx({ root, indent });
  return (
    <Stack
      // prettier-ignore
      className={classNames(className)}
      data-node-id={nodeId}
      data-node-type={nodeType}
      data-node-base-type={nodeBaseType}
      sx={{ ...sequenceNodeSx, ...sx }}
      spacing={0.5}
      py={1}
      {...restProps}
    >
      {children}
    </Stack>
  );
};
