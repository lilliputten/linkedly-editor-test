import { TCampaignGenericItem, TCampaignItemId } from 'src/entities/Campaign/types';
import { TEditableNodeChangeParams } from 'src/components/Campaign/EditableNode/EditableNode';

export interface TCampaignNodeChangeParams {
  nodeData: TCampaignGenericItem; // TCampaign | TCampaignPage | TCampaignSection | TCampaignQuestion;
  nodeId: TCampaignItemId;
  reorderRequired?: boolean;
  valueId: TEditableNodeChangeParams['valueId'];
  value: TEditableNodeChangeParams['value'] | TCampaignGenericItem[];
}
