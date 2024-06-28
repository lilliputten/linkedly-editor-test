import { TEditableNodeBaseProps } from '../../types/TEditableNodeBaseProps';
import { TEditableNodeValue } from '../../types/TEditableNodeValue';

export interface TEditableNodeDialogFieldProps extends TEditableNodeBaseProps {
  onChange: (value: TEditableNodeValue) => void;
}
