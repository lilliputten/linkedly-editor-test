export const sequenceNodeTypes = [
  // prettier-ignore
  'question',
  'section',
  'page',
  'root',
] as const;
export type TSequenceNodeType = (typeof sequenceNodeTypes)[number];
