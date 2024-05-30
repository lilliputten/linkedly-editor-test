import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { TextField } from '@mui/material';

import { TEditableNodeValue } from '../../types/TEditableNodeValue';

import { TEditableNodeDialogFieldProps } from './TEditableNodeDialogFieldProps';

export const EditableNodeDialogTextField: React.FC<TEditableNodeDialogFieldProps> = (props) => {
  const { nodeId, onChange, value: defaultValue, title } = props;

  type TEvent = HTMLTextAreaElement | HTMLInputElement;
  const handleChange = React.useCallback<ChangeEventHandler<TEvent>>(
    (event) => {
      const value = event.currentTarget.value as TEditableNodeValue;
      onChange(value);
    },
    [onChange],
  );

  const labelText = 'Enter value for ' + (title || 'field');

  // TODO: Set font size for autofill fields

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={labelText}
      data-editable-node-dialog-text-field-id={nodeId}
      // id="value"
      name="value"
      autoComplete="value"
      variant="outlined"
      autoFocus
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
};
