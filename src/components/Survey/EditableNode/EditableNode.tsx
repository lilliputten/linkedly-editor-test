import React from 'react';
import classNames from 'classnames';
import { Box, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { Edit } from '@mui/icons-material';

import { TEditableNodeValue } from './types/TEditableNodeValue';
import { TEditableNodeBaseProps } from './types/TEditableNodeBaseProps';

import { EditableNodeDialog } from './EditableNodeDialog';

import styles from './EditableNode.module.scss';
import { useLabelText } from './EditableNodeDialog/Fields/hooks';

type TTimeoutHandler = number; // ReturnType<typeof setTimeout>;
type TMemo = { timeoutHandler: TTimeoutHandler | undefined };

interface TEditableNodeProps extends TEditableNodeBaseProps {
  className?: string;
  textClassName?: string;
  wrap?: boolean;
  noShrink?: boolean;
  overflow?: boolean;
  flex?: number;
}

export const EditableNode: React.FC<TEditableNodeProps> = (props) => {
  const {
    // prettier-ignore
    className,
    textClassName,
    wrap,
    noShrink,
    overflow,
    flex,
    ...nodeBaseProps
  } = props;
  const {
    nodeId,
    editableType, // Editable field type
    value: defaultValue,
    selectOptions,
  } = nodeBaseProps;
  const [value, setValue] = React.useState<TEditableNodeValue>(defaultValue);
  // Prepare the viosible value (for 'select' node type...
  const showValue = React.useMemo(() => {
    if (editableType === 'select' && selectOptions) {
      const foundItem = selectOptions.find((item) => item.value === value);
      if (foundItem) {
        return foundItem.name;
      }
    }
    return value;
  }, [value, editableType, selectOptions]);
  /** Is dialog open? */
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  /** Is dialog rendered in components tree? (Allow delay to show hide transition effect.) */
  const [isDialogMounted, setDialogMounted] = React.useState(false);
  const memo = React.useMemo<TMemo>(() => ({ timeoutHandler: undefined }), []);
  const openDialog = React.useCallback(() => {
    setDialogOpen(true);
    setDialogMounted(true);
    if (memo.timeoutHandler) {
      clearTimeout(memo.timeoutHandler);
      memo.timeoutHandler = undefined;
    }
  }, [memo, setDialogOpen]);
  const closeDialog = React.useCallback(() => {
    setDialogOpen(false);
    if (memo.timeoutHandler) {
      clearTimeout(memo.timeoutHandler);
    }
    memo.timeoutHandler = setTimeout(setDialogMounted.bind(false), 300);
  }, [memo, setDialogOpen]);

  const labelText = useLabelText(props, 'Click to edit');

  const isEmpty = !showValue;

  const rootClassName = classNames(
    className,
    styles.root,
    wrap || styles.noWrap,
    overflow || styles.noOverflow,
    noShrink && styles.noShrink,
    isEmpty && styles.empty,
  );

  return (
    <>
      <Box
        // prettier-ignore
        className={rootClassName}
        data-editable-node-id={nodeId}
        flex={flex}
      >
        <ButtonBase
          // prettier-ignore
          className={styles.clickableWrapper}
          title={labelText}
          onClick={openDialog}
        >
          <Typography variant="body1" className={classNames(textClassName, styles.textNode)}>
            {showValue || ''}
          </Typography>
          <Box className={styles.editIcon}>
            <Edit />
          </Box>
        </ButtonBase>
      </Box>
      {isDialogMounted && (
        <EditableNodeDialog
          {...nodeBaseProps}
          value={value}
          open={isDialogOpen}
          closeDialog={closeDialog}
          onChange={setValue}
        />
      )}
    </>
  );
};
