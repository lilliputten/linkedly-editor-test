import { StackOwnProps } from '@mui/material';

import { TPropsWithChildrenAndClassName } from 'src/core/types';

import { TSequenceNodeOwnProps } from './TSequenceNodeOwnProps';

export type TSequenceNodeBaseProps = TPropsWithChildrenAndClassName &
  StackOwnProps &
  TSequenceNodeOwnProps;
