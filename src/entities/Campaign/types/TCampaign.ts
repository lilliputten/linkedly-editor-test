import { TQuestionType } from './TQuestionType';

export type TCampaignItemId = number;
export type TCampaignId = TCampaignItemId;
export type TCampaignPageId = TCampaignItemId;

export interface TCampaign {
  id: TCampaignId;
  name?: string; // Optional? The campaign name.
  items: TCampaignPage[];
}

export type TCampaignRoot = TCampaign;

export interface TCampaignOrderedItem {
  orderNumber: number;
}

export interface TCampaignPage extends TCampaignOrderedItem {
  // orderNumber: number; // in `TCampaignOrderedItem`
  pageId: TCampaignPageId;
  name?: string; // Optional? The page name.
  items: TCampaignSection[];
}

/** Section or question node
 * Sections can contain both questions and sections, recoursivcely
 */
export type TCampaignItem = TCampaignQuestion | TCampaignSection;
export type TCampaignGenericItem = TCampaign | TCampaignPage | TCampaignItem;

export interface TCampaignSection extends TCampaignOrderedItem {
  // orderNumber: number; // in `TCampaignOrderedItem`
  sectionId: TCampaignItemId;
  displayNumber: string;
  name: string;
  remark?: string;
  // TODO: Sections should be foldable.
  items: TCampaignItem[];
}
export interface TCampaignQuestion extends TCampaignOrderedItem {
  // orderNumber: number; // in `TCampaignOrderedItem`
  questionId: TCampaignItemId;
  typeId: TQuestionType;
  displayNumber: string;
  text: string;
  remark?: string;
  // TODO: Add other question fields?
}
