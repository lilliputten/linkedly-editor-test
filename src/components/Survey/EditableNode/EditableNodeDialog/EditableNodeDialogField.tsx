import React from 'react';
import { Box } from '@mui/material';

import { TEditableNodeDialogFieldProps } from './Fields/TEditableNodeDialogFieldProps';
import { EditableNodeDialogTextField } from './Fields/EditableNodeDialogTextField';

export const EditableNodeDialogField: React.FC<TEditableNodeDialogFieldProps> = (props) => {
  const { nodeId, editableType } = props;
  const Component: React.FC<TEditableNodeDialogFieldProps> = React.useMemo(() => {
    switch (editableType) {
      case 'text':
      default: {
        return EditableNodeDialogTextField;
      }
    }
  }, [editableType]);
  return (
    <Box
      // prettier-ignore
      data-node="EditableNodeDialogField"
      data-node-id={nodeId}
      data-editable-type="text"
    >
      <Component {...props} />
    </Box>
  );
};
