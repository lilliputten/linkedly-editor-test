import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeValue } from './TEditableNodeValue';

export interface TEditableNodeSelectItem<V = TEditableNodeValue, N = string> {
  value: V;
  name: N;
}

export type TEditableNodeBaseId = string | number;

export interface TEditableNodeBaseProps {
  nodeId?: string | number;
  // nodeId?: TCampaignItemId; // string | number;
  title?: string;
  editableType: TEditableNodeType;
  value: TEditableNodeValue;
  selectOptions?: TEditableNodeSelectItem[];
}
