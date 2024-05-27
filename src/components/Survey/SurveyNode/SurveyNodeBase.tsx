import * as React from 'react';
import { Stack } from '@mui/material';
import classNames from 'classnames';

import { useSurveyNodeSx } from './hooks';
import { TSurveyNodeBaseProps } from './types';

export const SurveyNodeBase: React.FC<TSurveyNodeBaseProps> = (props) => {
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
  const surveyNodeSx = useSurveyNodeSx({ root, indent });
  return (
    <Stack
      // prettier-ignore
      className={classNames(className)}
      data-node-id={nodeId}
      data-node-type={nodeType}
      data-node-base-type={nodeBaseType}
      sx={{ ...surveyNodeSx, ...sx }}
      {...restProps}
    >
      {children}
    </Stack>
  );
};
