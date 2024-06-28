import { TQuestionType } from 'src/entities/Sequence/types/TQuestionType';

import { TEditableNodeType } from './TEditableNodeType';
import { TEditableNodeSelectItem } from './TEditableNodeBaseProps';
import { questionTypeNames } from 'src/entities/Sequence/constants';

export const questionEditableTypes: Record<TQuestionType, TEditableNodeType> = {
  [TQuestionType.TextField]: 'text',
  [TQuestionType.YesNo]: 'select',
};

export const questionEditableTypeOptions: TEditableNodeSelectItem<TQuestionType>[] = [
  { value: TQuestionType.TextField, name: questionTypeNames[TQuestionType.TextField] },
  { value: TQuestionType.YesNo, name: questionTypeNames[TQuestionType.YesNo] },
];
