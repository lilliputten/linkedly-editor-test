import * as React from 'react';

import { CampaignNodeBase } from './CampaignNodeBase';
import { TCampaignNodeBaseProps } from './types';

export const CampaignNode: React.FC<TCampaignNodeBaseProps> = (props) => {
  const { children, ...restProps } = props;
  return <CampaignNodeBase {...restProps}>{children}</CampaignNodeBase>;
};
