import { TSequenceElementType } from './TSequenceElementType';

export type TSequenceItemId = number;
export type TSequenceId = TSequenceItemId;
export type TSequencePageId = TSequenceItemId;

export interface TSequence {
  id: TSequenceId;
  name?: string; // Optional? The sequence name.
  items: TSequenceSection[];
}

export type TSequenceRoot = TSequence;

export interface TSequenceOrderedItem {
  orderNumber: number;
}

// export type TSequenceItem = TSequenceElement | TSequenceSection;
// export type TSequenceGenericItem = TSequence | TSequenceItem;

export interface TSequenceSection extends TSequenceOrderedItem {
  sectionId: TSequenceItemId;
  name: string;
  items: TSequenceItem[];
}
export interface TSequenceItem extends TSequenceOrderedItem {
  itemId: TSequenceItemId;
  typeId?: TSequenceElementType;
  creditsCount: number;
  text: string;
  // TODO: Other sequence fields?
}
