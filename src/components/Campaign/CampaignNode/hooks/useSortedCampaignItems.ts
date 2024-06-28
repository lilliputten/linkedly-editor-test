import { TCampaignOrderedItem } from 'src/entities/Campaign/types';
import { surveyItemsSorter } from '../helpers';

export function useSortedCampaignItems<T extends TCampaignOrderedItem>(items: T[]) {
  // Clone & sort array using `surveyItemsSorter` helper...
  const sortedQuestions = [...items];
  sortedQuestions.sort(surveyItemsSorter);
  return sortedQuestions;
}
