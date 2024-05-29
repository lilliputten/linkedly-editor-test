import { TQuestionType } from './TQuestionType';

export type TSurveyItemId = number;
export type TSurveyId = TSurveyItemId;
export type TSurveyPageId = TSurveyItemId;

export interface TSurvey {
  id: TSurveyId;
  name?: string; // Optional? The survey name.
  pages: TSurveyPage[];
}

export interface TSurveyOrderedItem {
  orderNumber: number;
}

export interface TSurveyPage extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  pageId: TSurveyPageId;
  name?: string; // Optional? The page name.
  sections: TSurveySection[];
}

/** Section or question node
 * Sections can contain both questions and sections, recoursivcely
 */
export type TSurveyItem = TSurveyQuestion & TSurveySection;

export interface TSurveySection extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  sectionId: TSurveyItemId;
  displayNumber: string;
  name: string;
  remark?: string;
  // TODO: Sections should be foldable.
  items: TSurveyItem[];
}
export interface TSurveyQuestion extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  questionId: TSurveyItemId;
  typeId: TQuestionType;
  displayNumber: string;
  text: string;
  remark?: string;
  // TODO: Add other question fields?
}
