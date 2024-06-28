import { TSequenceOrderedItem } from 'src/entities/Sequence/types';
import { sequenceItemsSorter } from '../helpers';

export function useSortedSequenceItems<T extends TSequenceOrderedItem>(items: T[]) {
  // Clone & sort array using `sequenceItemsSorter` helper...
  const sortedSequenceElements = [...items];
  sortedSequenceElements.sort(sequenceItemsSorter);
  return sortedSequenceElements;
}
