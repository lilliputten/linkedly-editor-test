// @see `TSequenceNodeType`
//
export const sequenceNodeSkeletonTypes = [
  // prettier-ignore
  'sequenceElement',
  'section',
  'page',
  'root',
  'sequenceElement-content',
  'section-content',
  'page-content',
  'root-content',
  'sequenceElement-own-content',
  'section-own-content',
  'page-own-content',
  'root-own-content',
] as const;
export type TSequenceNodeBaseType = (typeof sequenceNodeSkeletonTypes)[number];
