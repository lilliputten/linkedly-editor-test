// @see `TSequenceNodeType`
//
export const sequenceNodeSkeletonTypes = [
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
export type TSequenceNodeBaseType = (typeof sequenceNodeSkeletonTypes)[number];
