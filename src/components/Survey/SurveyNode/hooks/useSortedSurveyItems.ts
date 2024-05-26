import { TSurveyOrderedItem } from 'src/entities/Survey/types';
import { surveyItemsSorter } from '../helpers';

export function useSortedSurveyItems<T extends TSurveyOrderedItem>(questions: T[]) {
  // Clone & sort array using `surveyItemsSorter` helper...
  const sortedQuestions = [...questions];
  sortedQuestions.sort(surveyItemsSorter);
  return sortedQuestions;
}
