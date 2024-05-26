import { StackOwnProps } from '@mui/material';

import { TPropsWithChildrenAndClassName } from 'src/core/types';

import { TSurveyNodeOwnProps } from './TSurveyNodeOwnProps';

export type TSurveyNodeBaseProps = TPropsWithChildrenAndClassName &
  StackOwnProps &
  TSurveyNodeOwnProps;
