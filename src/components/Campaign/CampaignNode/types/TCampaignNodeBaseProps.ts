import { StackOwnProps } from '@mui/material';

import { TPropsWithChildrenAndClassName } from 'src/core/types';

import { TCampaignNodeOwnProps } from './TCampaignNodeOwnProps';

export type TCampaignNodeBaseProps = TPropsWithChildrenAndClassName &
  StackOwnProps &
  TCampaignNodeOwnProps;
