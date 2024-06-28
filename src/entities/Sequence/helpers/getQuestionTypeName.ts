import { TQuestionType } from '../types/TQuestionType';
import { questionTypeNames } from '../constants';

export function getQuestionTypeName(typeId: TQuestionType) {
  if (typeId == null) {
    return 'Empty';
  }
  return questionTypeNames[typeId] || `Unknown (${typeId})`;
}
