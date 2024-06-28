export const surveyNodeTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
] as const;
export type TCampaignNodeType = (typeof surveyNodeTypes)[number];
