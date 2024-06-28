import * as React from 'react';
import { ChangeEventHandler } from 'react';
import { IconButton, TextField } from '@mui/material';

import { TEditableNodeValue } from '../../types/TEditableNodeValue';

import { TEditableNodeDialogFieldProps } from './TEditableNodeDialogFieldProps';
import { useLabelText } from './hooks';
import { Clear } from '@mui/icons-material';

export const EditableNodeDialogTextField: React.FC<TEditableNodeDialogFieldProps> = (props) => {
  const { nodeId, onChange, value: defaultValue } = props;

  const [value, setValue] = React.useState<TEditableNodeValue>(defaultValue);

  const resetValue = React.useCallback(() => {
    setValue('');
    onChange('');
  }, [onChange]);

  type TElement = HTMLTextAreaElement | HTMLInputElement;
  const handleChange = React.useCallback<ChangeEventHandler<TElement>>(
    (event) => {
      const value = event.currentTarget.value as TEditableNodeValue;
      setValue(value);
      onChange(value);
    },
    [onChange],
  );

  const labelText = useLabelText(props);

  // TODO: Set font size for autofill fields

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={labelText}
      data-editable-node-dialog-text-field-id={nodeId}
      // id="value"
      // name="value"
      // autoComplete="value"
      variant="outlined"
      autoFocus
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: value ? (
          <IconButton
            size="small"
            onClick={resetValue}
            // sx={{ opacity: 0.5 }}
          >
            <Clear fontSize="small" />
          </IconButton>
        ) : undefined,
      }}
    />
  );
};
