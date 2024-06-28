import { TSequence } from './TSequence';

export type TSequenceListItem = Pick<TSequence, 'id' | 'name'>;
export type TSequenceList = TSequenceListItem[];
