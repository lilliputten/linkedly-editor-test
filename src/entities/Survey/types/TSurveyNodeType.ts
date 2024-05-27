export const surveyNodeTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
] as const;
export type TSurveyNodeType = (typeof surveyNodeTypes)[number];
