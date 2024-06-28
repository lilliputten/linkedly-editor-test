import * as React from 'react';

import { TCampaignNodeBaseProps } from './types';
import { CampaignNodeBase } from './CampaignNodeBase';

export const CampaignNodeOwnContent: React.FC<TCampaignNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <CampaignNodeBase {...restProps}>{children}</CampaignNodeBase>;
};
