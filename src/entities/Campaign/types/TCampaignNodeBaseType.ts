// @see `TCampaignNodeType`
//
export const campaignNodeSkeletonTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
  'question-content',
  'section-content',
  'page-content',
  'root-content',
  'question-own-content',
  'section-own-content',
  'page-own-content',
  'root-own-content',
] as const;
export type TCampaignNodeBaseType = (typeof campaignNodeSkeletonTypes)[number];
