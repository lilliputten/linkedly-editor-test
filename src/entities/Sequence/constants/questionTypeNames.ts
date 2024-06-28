import { TSequenceElementType } from '../types/TSequenceElementType';

export const questionTypeNames: Record<TSequenceElementType, string> = {
  [TSequenceElementType.TextField]: 'Text Field',
  [TSequenceElementType.YesNo]: 'Yes / No',
};
