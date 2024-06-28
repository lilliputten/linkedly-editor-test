export const campaignNodeTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
] as const;
export type TCampaignNodeType = (typeof campaignNodeTypes)[number];
