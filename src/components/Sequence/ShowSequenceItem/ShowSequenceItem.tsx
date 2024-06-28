import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { Scrollable } from 'src/ui/Basic';
import { TSequenceItem } from 'src/entities/Sequence/types';
// import { ShowSequenceItemRoot } from 'src/components/Sequence/ShowSequenceItem';

export interface TShowSequenceItemProps extends TPropsWithClassName {
  // handleChange?: (params: TSequenceNodeChangeParams) => void;
  itemData: TSequenceItem;
}

export const ShowSequenceItem: React.FC<TShowSequenceItemProps> = (props) => {
  const {
    className,
    // handleChange,
    itemData,
  } = props;
  const {
    // prettier-ignore
    itemId,
  } = itemData;
  return (
    <Scrollable
      data-item-id={itemId}
      className={classNames(className, 'ShowSection')}
      fullCenter={false}
    >
      <Container maxWidth="md" sx={{ my: 1 }}>
        <pre>{JSON.stringify(itemData, null, 2)}</pre>
        {/*
        <ShowSequenceRoot
          // prettier-ignore
          sequenceData={sequenceData}
          onChange={handleChange}
        />
        */}
      </Container>
    </Scrollable>
  );
};
