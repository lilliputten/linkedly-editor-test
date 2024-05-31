import * as React from 'react';
import { ChangeEventHandler } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';

import { TEditableNodeValue } from '../../types/TEditableNodeValue';

import { TEditableNodeDialogFieldProps } from './TEditableNodeDialogFieldProps';
import { useLabelText } from './hooks';

export const EditableNodeDialogSelectField: React.FC<TEditableNodeDialogFieldProps> = (props) => {
  const { nodeId, onChange, value: defaultValue, selectOptions } = props;

  /*
  const valueNode = React.useMemo(() => {
    return selectOptions?.find((option) => option.value === defaultValue);
  }, [defaultValue, selectOptions]);
  const [value, setValue] = React.useState<TEditableNodeValue>(defaultValue);
  */

  type TElement = HTMLSelectElement;
  const handleChange = React.useCallback(
    (event: SelectChangeEvent<TElement>) => {
      const value = event.target.value as TEditableNodeValue;
      onChange(value);
    },
    [onChange],
  );

  const options = React.useMemo(() => {
    if (!selectOptions) {
      return null;
    }
    return selectOptions.map((item) => {
      const { value, name } = item;
      const selected = value === defaultValue;
      return (
        <MenuItem key={value} value={value} selected={selected}>
          {name}
        </MenuItem>
      );
    });
  }, [selectOptions, defaultValue]);

  const labelText = useLabelText(props, 'Select value for');

  return (
    <FormControl fullWidth>
      <InputLabel>{labelText}</InputLabel>
      <Select
        required
        fullWidth
        label={labelText}
        data-editable-node-dialog-text-field-id={nodeId}
        variant="outlined"
        autoFocus
        defaultValue={defaultValue as unknown as HTMLSelectElement}
        onChange={handleChange}
      >
        {options}
      </Select>
    </FormControl>
  );
};
