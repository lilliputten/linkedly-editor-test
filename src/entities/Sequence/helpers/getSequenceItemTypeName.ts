import { TSequenceItemType, defaultSequenceItemType } from '../types/TSequenceItemType';
import { sequenceItemTypeNames } from '../constants';

export function getSequenceItemTypeName(typeId: TSequenceItemType = defaultSequenceItemType) {
  return sequenceItemTypeNames[typeId] || `Unknown (${typeId})`;
}
