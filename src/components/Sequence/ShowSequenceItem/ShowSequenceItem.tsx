import React from 'react';
import classNames from 'classnames';
import { ButtonBase } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { TSequenceItem } from 'src/entities/Sequence/types';

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
  return (
    <ButtonBase
      data-item-id={itemId}
      data-item-type={typeId}
      className={classNames(className, styles.root)}
    >
      {text}
      {/* TODO: Credits block */}
    </ButtonBase>
  );
};
