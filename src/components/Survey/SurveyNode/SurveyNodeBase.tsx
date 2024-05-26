import * as React from 'react';
import { Stack, StackOwnProps } from '@mui/material';
import classNames from 'classnames';

import { TPropsWithChildrenAndClassName } from 'src/core/types';
import { useSurveyNodeSx } from './hooks';

// export type TSurveyNodeProps = TPropsWithChildrenAndClassName &
//   StackOwnProps & { root?: boolean; indent?: boolean };
export interface TSurveyNodeProps extends TPropsWithChildrenAndClassName, StackOwnProps {
  root?: boolean;
  indent?: boolean;
  nodeType?: string;
  nodeId?: string | number;
}

export const SurveyNodeBase: React.FC<TSurveyNodeProps> = (props) => {
  const {
    // prettier-ignore
    nodeType,
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
      sx={{ ...surveyNodeSx, ...sx }}
      {...restProps}
    >
      {children}
    </Stack>
  );
};
