import { TSequenceElementType, defaultSequenceElementType } from '../types/TSequenceElementType';
import { sequenceElementTypeNames } from '../constants';

export function getSequenceElementTypeName(
  typeId: TSequenceElementType = defaultSequenceElementType,
) {
  return sequenceElementTypeNames[typeId] || `Unknown (${typeId})`;
}
