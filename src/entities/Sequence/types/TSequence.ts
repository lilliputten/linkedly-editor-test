import { TQuestionType } from './TQuestionType';

export type TSequenceItemId = number;
export type TSequenceId = TSequenceItemId;
export type TSequencePageId = TSequenceItemId;

export interface TSequence {
  id: TSequenceId;
  name?: string; // Optional? The sequence name.
  items: TSequencePage[];
}

export type TSequenceRoot = TSequence;

export interface TSequenceOrderedItem {
  orderNumber: number;
}

export interface TSequencePage extends TSequenceOrderedItem {
  // orderNumber: number; // in `TSequenceOrderedItem`
  pageId: TSequencePageId;
  name?: string; // Optional? The page name.
  items: TSequenceSection[];
}

/** Section or question node
 * Sections can contain both questions and sections, recoursivcely
 */
export type TSequenceItem = TSequenceQuestion | TSequenceSection;
export type TSequenceGenericItem = TSequence | TSequencePage | TSequenceItem;

export interface TSequenceSection extends TSequenceOrderedItem {
  // orderNumber: number; // in `TSequenceOrderedItem`
  sectionId: TSequenceItemId;
  displayNumber: string;
  name: string;
  remark?: string;
  // TODO: Sections should be foldable.
  items: TSequenceItem[];
}
export interface TSequenceQuestion extends TSequenceOrderedItem {
  // orderNumber: number; // in `TSequenceOrderedItem`
  questionId: TSequenceItemId;
  typeId: TQuestionType;
  displayNumber: string;
  text: string;
  remark?: string;
  // TODO: Add other question fields?
}
