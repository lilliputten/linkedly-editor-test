import { TSequenceElementType } from 'src/entities/Sequence/types/TSequenceElementType';

import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeSelectItem } from './TEditableNodeBaseProps';
import { sequenceElementTypeNames } from 'src/entities/Sequence/constants';

export const sequenceEditableTypes: Record<TSequenceElementType, TEditableNodeType> = {
  [TSequenceElementType.TextField]: 'text',
  [TSequenceElementType.YesNo]: 'select',
};

export const sequenceEditableTypeOptions: TEditableNodeSelectItem<TSequenceElementType>[] = [
  {
    value: TSequenceElementType.TextField,
    name: sequenceElementTypeNames[TSequenceElementType.TextField],
  },
  { value: TSequenceElementType.YesNo, name: sequenceElementTypeNames[TSequenceElementType.YesNo] },
];
