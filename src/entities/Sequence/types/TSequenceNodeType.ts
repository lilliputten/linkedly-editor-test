export const sequenceNodeTypes = [
  // prettier-ignore
  'sequenceElement',
  'section',
  'page',
  'root',
] as const;
export type TSequenceNodeType = (typeof sequenceNodeTypes)[number];
