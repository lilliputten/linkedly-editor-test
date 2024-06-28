import { TSequenceElementType } from 'src/entities/Sequence/types/TSequenceElementType';

import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeSelectItem } from './TEditableNodeBaseProps';
import { questionTypeNames } from 'src/entities/Sequence/constants';

export const questionEditableTypes: Record<TSequenceElementType, TEditableNodeType> = {
  [TSequenceElementType.TextField]: 'text',
  [TSequenceElementType.YesNo]: 'select',
};

export const questionEditableTypeOptions: TEditableNodeSelectItem<TSequenceElementType>[] = [
  {
    value: TSequenceElementType.TextField,
    name: questionTypeNames[TSequenceElementType.TextField],
  },
  { value: TSequenceElementType.YesNo, name: questionTypeNames[TSequenceElementType.YesNo] },
];
