// @see `TSequenceNodeType`
//
export const sequenceNodeSkeletonTypes = [
  // prettier-ignore
  'sequenceItem',
  'section',
  'page',
  'root',
  'sequenceItem-content',
  'section-content',
  'page-content',
  'root-content',
  'sequenceItem-own-content',
  'section-own-content',
  'page-own-content',
  'root-own-content',
] as const;
export type TSequenceNodeBaseType = (typeof sequenceNodeSkeletonTypes)[number];
