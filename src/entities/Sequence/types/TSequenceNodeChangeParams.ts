import { TSequenceGenericItem, TSequenceItemId } from 'src/entities/Sequence/types';
// import { TEditableNodeChangeParams } from 'src/components/Sequence/EditableNode/EditableNode';

export interface TSequenceNodeChangeParams {
  nodeData: TSequenceGenericItem; // TSequence | TSequenceSection | TSequenceElement;
  nodeId: TSequenceItemId;
  reorderRequired?: boolean;
  // valueId: TEditableNodeChangeParams['valueId'];
  // value: TEditableNodeChangeParams['value'] | TSequenceGenericItem[];
}
