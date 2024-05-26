export type TSurveyId = number;
export interface TSurvey {
  id: TSurveyId;
  name?: string; // Optional? TSurveyhe survey name to display for user
  pages: TSurveyPage[];
}
export interface TSurveyOrderedItem {
  orderNumber: number;
}
export interface TSurveyPage extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  pageId: number;
  sections: TSurveySection[];
}
export interface TSurveySection extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  sectionId: number;
  displayNumber: string;
  sectionName: string;
  sectionRemark?: string;
  questions: TSurveyQuestion[];
}
// export type TSurveyQuestionType = 1 | 2;
export enum TSurveyQuestionType {
  TextField = 1,
  YesNo = 2,
}
export interface TSurveyQuestion extends TSurveyOrderedItem {
  // orderNumber: number; // in `TSurveyOrderedItem`
  questionId: number;
  typeId: TSurveyQuestionType;
  displayNumber: string;
  questionText: string;
  remark?: string;
  // TSurveyODO: Add other question fields?
}
