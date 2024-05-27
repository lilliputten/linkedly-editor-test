import { TQuestionType } from './TQuestionType';

export type TSurveyItemId = number;
export type TSurveyId = TSurveyItemId;

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
  pageId: TSurveyItemId;
  sections: TSurveySection[];
}
export interface TSurveySection extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  sectionId: TSurveyItemId;
  displayNumber: string;
  sectionName: string;
  sectionRemark?: string;
  // TODO: Sections should be foldable.
  questions: TSurveyQuestion[];
}
export interface TSurveyQuestion extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  questionId: TSurveyItemId;
  typeId: TQuestionType;
  displayNumber: string;
  questionText: string;
  remark?: string;
  // TODO: Add other question fields?
}
