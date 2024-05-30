import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Check, Close } from '@mui/icons-material';
import { Box, DialogContent, IconButton, Stack } from '@mui/material';
import { DialogPopupPaper } from 'src/components/MUI/DialogPopupPaper';

import { TEditableNodeBaseProps } from '../types/TEditableNodeBaseProps';
import { TEditableNodeValue } from '../types/TEditableNodeValue';

import { EditableNodeDialogField } from './EditableNodeDialogField';

export interface TEditableNodeDialogProps extends TEditableNodeBaseProps {
  open: boolean;
  // value: string;
  onChange: (value: TEditableNodeValue) => void;
  closeDialog: () => void;
}

// interface
// export const TextField: React.FC<TEditableNodeDialogProps> = (props) => {

export const EditableNodeDialog: React.FC<TEditableNodeDialogProps> = (props) => {
  const { nodeId, onChange, closeDialog, value: defaultValue, open, title } = props;

  const [value, setValue] = React.useState<TEditableNodeValue>(defaultValue);
  const [hasChanged, setChanged] = React.useState(false);
  const memo = React.useMemo<{ value: TEditableNodeValue; hasChanged: boolean }>(
    () => ({ value: '', hasChanged: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Update memoized value...
  React.useEffect(() => {
    memo.value = value;
  }, [memo, value]);

  // Reset changed status and update values on default value change...
  React.useEffect(() => {
    memo.value = defaultValue;
    setValue(defaultValue);
    memo.hasChanged = false;
    setChanged(false);
  }, [memo, defaultValue]);

  const handleChange = React.useCallback(
    (value: TEditableNodeValue) => {
      setValue(value);
      setChanged(true);
      memo.hasChanged = true;
    },
    [memo],
  );

  const handleSaveAndClose = React.useCallback(() => {
    /* console.log('[EditableNodeDialog] handleSaveAndClose', {
     *   value: memo.value,
     * });
     */
    onChange(memo.value);
    closeDialog();
    return false;
  }, [closeDialog, memo, onChange]);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSaveAndClose();
    },
    [handleSaveAndClose],
  );

  return (
    <Dialog
      open={open}
      data-node="EditableNodeDialog"
      data-node-id={nodeId}
      onClose={closeDialog}
      maxWidth="md"
      PaperComponent={DialogPopupPaper}
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          flexGrow={1}
          sx={{
            fontSize: '125%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Edit {title || 'field'}
        </Box>
        <Box>
          <IconButton onClick={closeDialog}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <EditableNodeDialogField {...props} onChange={handleChange} />
          <Stack direction="row" spacing={1} mt={3}>
            <Button type="submit" variant="contained" startIcon={<Check />} disabled={!hasChanged}>
              Save
            </Button>
            <Button variant="outlined" startIcon={<Close />} onClick={closeDialog}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
