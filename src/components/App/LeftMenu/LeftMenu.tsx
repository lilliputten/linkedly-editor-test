import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { IconButton, Stack } from '@mui/material';
import { Settings } from '@mui/icons-material';

import { TPropsWithClassName } from 'src/core/types';

import styles from './LeftMenu.module.scss';

export const LeftMenu: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  return (
    <Stack className={classNames(className, styles.root)} direction="column">
      <IconButton>
        <Settings sx={{ color: 'white' }} />
      </IconButton>
    </Stack>
  );
});
