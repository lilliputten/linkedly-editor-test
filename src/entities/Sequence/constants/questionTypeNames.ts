import { TQuestionType } from '../types/TQuestionType';

export const questionTypeNames: Record<TQuestionType, string> = {
  [TQuestionType.TextField]: 'Text Field',
  [TQuestionType.YesNo]: 'Yes / No',
};
