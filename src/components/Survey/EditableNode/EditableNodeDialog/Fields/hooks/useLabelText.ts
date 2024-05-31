import { TEditableNodeBaseProps } from '../../../types/TEditableNodeBaseProps';

export function useLabelText(props: TEditableNodeBaseProps, prefix: string = 'Enter value for') {
  const { title } = props;
  return [prefix, title || 'field'].filter(Boolean).join(' ');
}
