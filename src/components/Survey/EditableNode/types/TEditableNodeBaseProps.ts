import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeValue } from './TEditableNodeValue';

export interface TEditableNodeSelectItem {
  value: TEditableNodeValue;
  text: string;
}

export interface TEditableNodeBaseProps {
  nodeId?: string | number;
  title?: string;
  editableType: TEditableNodeType;
  value: TEditableNodeValue;
  selectOptions?: TEditableNodeSelectItem[];
}
