import React from 'react';
import classNames from 'classnames';
import { Box, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { Edit } from '@mui/icons-material';

import { TSurveyItemId, TSurveyGenericItem } from 'src/entities/Survey/types';

import { TEditableNodeValue } from './types/TEditableNodeValue';
import { TEditableNodeBaseId, TEditableNodeBaseProps } from './types/TEditableNodeBaseProps';
import { EditableNodeDialog } from './EditableNodeDialog';
import { useLabelText } from './EditableNodeDialog/Fields/hooks';

import styles from './EditableNode.module.scss';

type TTimeoutHandler = number; // ReturnType<typeof setTimeout>;
type TMemo = { timeoutHandler: TTimeoutHandler | undefined };

export interface TEditableNodeChangeParams {
  valueId?: string;
  value: TEditableNodeValue;
  nodeId: TEditableNodeBaseId;
  node: TEditableNodeBaseProps;
}

interface TEditableNodeProps extends TEditableNodeBaseProps {
  activeButtonId?: string;
  className?: string;
  textClassName?: string;
  wrap?: boolean;
  noShrink?: boolean;
  overflow?: boolean;
  flex?: number;
  setOpenDialogCb?: (openDialog: () => void) => void;
  valueId?: string;
  onChange?: (params: TEditableNodeChangeParams) => void;
  isNumber?: boolean;
}

export const EditableNode: React.FC<TEditableNodeProps> = (props) => {
  const {
    // prettier-ignore
    activeButtonId,
    className,
    textClassName,
    wrap,
    noShrink,
    overflow,
    flex,
    setOpenDialogCb,
    valueId,
    onChange,
    isNumber,
    ...nodeBaseProps
  } = props;
  const {
    nodeId,
    editableType, // Editable field type
    value: defaultValue,
    selectOptions,
  } = nodeBaseProps;
  const [value, setValue] = React.useState<TEditableNodeValue>(defaultValue);
  const updateValue = React.useCallback(
    (value: TEditableNodeValue) => {
      if (isNumber) {
        value = Number(value) || '';
      }
      setValue(value);
      if (onChange && nodeId) {
        const params: TEditableNodeChangeParams = {
          valueId,
          value,
          nodeId,
          node: nodeBaseProps,
        };
        onChange(params);
      }
    },
    [isNumber, nodeBaseProps, nodeId, onChange, valueId],
  );
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
  // Register open dialog callback
  React.useEffect(() => {
    if (setOpenDialogCb) {
      setOpenDialogCb(openDialog);
    }
  }, [openDialog, setOpenDialogCb]);
  const closeDialog = React.useCallback(() => {
    setDialogOpen(false);
    if (memo.timeoutHandler) {
      clearTimeout(memo.timeoutHandler);
    }
    memo.timeoutHandler = setTimeout(setDialogMounted.bind(false), 300);
  }, [memo, setDialogOpen]);

  const labelText = useLabelText(props, 'Edit');

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
          id={activeButtonId || `editable-node-${nodeId}-button`}
          className={classNames(styles.clickableWrapper, isDialogOpen && styles.buttonActive)}
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
          onChange={updateValue}
        />
      )}
    </>
  );
};
