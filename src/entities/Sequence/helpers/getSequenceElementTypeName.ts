import { TSequenceElementType } from '../types/TSequenceElementType';
import { sequenceElementTypeNames } from '../constants';

export function getSequenceElementTypeName(typeId: TSequenceElementType) {
  if (typeId == null) {
    return 'Empty';
  }
  return sequenceElementTypeNames[typeId] || `Unknown (${typeId})`;
}
