export const editableNodeTypes = [
  // prettier-ignore
  'text',
  'textarea',
  'select',
  // TODO:
  // 'checkbox'
] as const;
export type TEditableNodeType = (typeof editableNodeTypes)[number];
