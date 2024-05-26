// @see `TSurveyNodeType`
//
export const surveyNodeSkeletonTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
  'question-content',
  'section-content',
  'page-content',
  'root-content',
] as const;
export type TSurveyNodeBaseType = (typeof surveyNodeSkeletonTypes)[number];
