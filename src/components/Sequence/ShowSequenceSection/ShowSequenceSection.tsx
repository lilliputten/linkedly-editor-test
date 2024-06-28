import React from 'react';
import classNames from 'classnames';
import { Box, Stack } from '@mui/material';

import { TPropsWithClassName } from 'src/core/types';
import { TSequenceSection } from 'src/entities/Sequence/types';
import { ShowSequenceItem } from '../ShowSequenceItem';

export interface TShowSequenceSectionProps extends TPropsWithClassName {
  sectionData: TSequenceSection;
}

export const ShowSequenceSection: React.FC<TShowSequenceSectionProps> = (props) => {
  const {
    // prettier-ignore
    className,
    sectionData,
  } = props;
  const {
    // prettier-ignore
    sectionId,
    items,
    name,
  } = sectionData;
  return (
    <Stack
      // prettier-ignore
      data-section-id={sectionId}
      className={classNames(className, 'ShowSequenceSection')}
      direction="column"
      gap={2}
    >
      <Box
        // prettier-ignore
        className={classNames('ShowSequenceSection_Title')}
        sx={{ fontWeight: 'bold' }}
      >
        {name}
      </Box>
      <Stack
        // prettier-ignore
        className={classNames('ShowSequenceSection_Items')}
        direction="column"
        gap={2}
      >
        {items.map((itemData) => {
          return <ShowSequenceItem key={itemData.itemId} itemData={itemData} />;
        })}
      </Stack>
    </Stack>
  );
};
