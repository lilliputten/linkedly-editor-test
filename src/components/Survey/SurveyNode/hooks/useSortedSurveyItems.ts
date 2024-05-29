import { TSurveyOrderedItem } from 'src/entities/Survey/types';
import { surveyItemsSorter } from '../helpers';

export function useSortedSurveyItems<T extends TSurveyOrderedItem>(items: T[]) {
  // Clone & sort array using `surveyItemsSorter` helper...
  const sortedQuestions = [...items];
  sortedQuestions.sort(surveyItemsSorter);
  return sortedQuestions;
}
