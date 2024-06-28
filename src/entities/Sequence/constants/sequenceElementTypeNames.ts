import { TSequenceElementType } from '../types/TSequenceElementType';

export const sequenceElementTypeNames: Record<TSequenceElementType, string> = {
  [TSequenceElementType.TextField]: 'Text Field',
  [TSequenceElementType.YesNo]: 'Yes / No',
};
