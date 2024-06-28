import { TSequenceElementType } from '../types/TSequenceElementType';
import { questionTypeNames } from '../constants';

export function getSequenceElementTypeName(typeId: TSequenceElementType) {
  if (typeId == null) {
    return 'Empty';
  }
  return questionTypeNames[typeId] || `Unknown (${typeId})`;
}
