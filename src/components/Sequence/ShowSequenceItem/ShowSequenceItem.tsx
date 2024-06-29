import React from 'react';
import classNames from 'classnames';
import { ButtonBase } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { TSequenceItem } from 'src/entities/Sequence/types';
import { dragSequenceItemFormatId } from 'src/entities/Sequence/constants';

import styles from './ShowSequenceItem.module.scss';

interface TShowSequenceItemProps extends TPropsWithClassName {
  itemData: TSequenceItem;
}

export const ShowSequenceItem: React.FC<TShowSequenceItemProps> = (props) => {
  const {
    // prettier-ignore
    className,
    itemData,
  } = props;
  const {
    // prettier-ignore
    itemId,
    typeId,
    // creditsCount,
    text,
  } = itemData;
  // React.DragEventHandler<HTMLAnchorElement>
  const onDragStart = React.useCallback<React.DragEventHandler<HTMLElement>>(
    (event) => {
      event.dataTransfer.setData(dragSequenceItemFormatId, JSON.stringify(itemData));
      event.dataTransfer.effectAllowed = 'move';
    },
    [itemData],
  );
  return (
    <ButtonBase
      data-item-id={itemId}
      data-item-type={typeId}
      className={classNames(className, styles.root)}
      onDragStart={onDragStart}
      draggable={true}
    >
      {text}
      {/* TODO: Show credits block */}
    </ButtonBase>
  );
};
