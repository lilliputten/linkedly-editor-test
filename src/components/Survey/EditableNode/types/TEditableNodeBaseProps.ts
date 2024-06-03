import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeValue } from './TEditableNodeValue';

export interface TEditableNodeSelectItem<V = TEditableNodeValue, N = string> {
  value: V;
  name: N;
}

export interface TEditableNodeBaseProps {
  nodeId?: string | number;
  title?: string;
  editableType: TEditableNodeType;
  value: TEditableNodeValue;
  selectOptions?: TEditableNodeSelectItem[];
}
