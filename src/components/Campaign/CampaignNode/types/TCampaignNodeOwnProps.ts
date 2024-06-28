import { TCampaignNodeBaseType, TCampaignNodeType } from 'src/entities/Campaign/types';

export interface TCampaignNodeOwnProps {
  nodeType?: TCampaignNodeType;
  nodeBaseType?: TCampaignNodeBaseType;
  nodeId?: string | number;
  root?: boolean;
  indent?: boolean;
}
