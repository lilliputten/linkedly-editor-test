import { TCampaignOrderedItem } from 'src/entities/Campaign/types';
import { campaignItemsSorter } from '../helpers';

export function useSortedCampaignItems<T extends TCampaignOrderedItem>(items: T[]) {
  // Clone & sort array using `campaignItemsSorter` helper...
  const sortedQuestions = [...items];
  sortedQuestions.sort(campaignItemsSorter);
  return sortedQuestions;
}
