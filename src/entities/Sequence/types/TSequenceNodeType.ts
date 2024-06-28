export const sequenceNodeTypes = [
  // prettier-ignore
  'sequenceItem',
  'section',
  'page',
  'root',
] as const;
export type TSequenceNodeType = (typeof sequenceNodeTypes)[number];
