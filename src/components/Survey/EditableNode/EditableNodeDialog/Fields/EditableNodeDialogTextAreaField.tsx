import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { TEditableNodeValue } from '../../types/TEditableNodeValue';

import { TEditableNodeDialogFieldProps } from './TEditableNodeDialogFieldProps';
import { useLabelText } from './hooks';

const showRows = 5;

export const EditableNodeDialogTextAreaField: React.FC<TEditableNodeDialogFieldProps> = (props) => {
  const { nodeId, onChange, value: defaultValue } = props;

  type TElement = HTMLTextAreaElement | HTMLInputElement;
  const handleChange = React.useCallback<ChangeEventHandler<TElement>>(
    (event) => {
      const value = event.currentTarget.value as TEditableNodeValue;
      onChange(value);
    },
    [onChange],
  );

  const labelText = useLabelText(props);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={labelText}
      data-editable-node-dialog-text-field-id={nodeId}
      // name="value"
      // autoComplete="value"
      variant="outlined"
      autoFocus
      defaultValue={defaultValue}
      onChange={handleChange}
      multiline
      rows={showRows}
    />
  );
};
