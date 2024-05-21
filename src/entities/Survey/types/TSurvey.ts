export interface TSurvey {
  id: number;
  name?: string; // Optional? TSurveyhe survey name to display for user
  pages: TSurveyPage[];
}
export interface TSurveyPage {
  pageId: number;
  orderNumber: number;
  sections: TSurveySection[];
}
export interface TSurveySection {
  sectionId: number;
  orderNumber: number;
  displayNumber: string;
  sectionName: string;
  sectionRemark?: string;
  questions: TSurveyQuestion[];
}
export enum TSurveyQuestionType {
  TSurveyext = 1,
  YesNo = 2,
}
// export type TSurveyQuestionType = 1 | 2;
export interface TSurveyQuestion {
  questionId: number;
  typeId: TSurveyQuestionType;
  orderNumber: number;
  displayNumber: string;
  questionText: string;
  remark?: string;
  // TSurveyODO: Add other question fields?
}
