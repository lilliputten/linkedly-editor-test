import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';

import { adaptivePageXPadding } from 'src/core/constants/app';

import styles from './MainMenu.module.scss';

export function MainMenu(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <Paper elevation={3} className={classNames(className, styles.root)}>
      <Box px={adaptivePageXPadding} py={1.2}>
        <Box>MainMenu</Box>
      </Box>
    </Paper>
  );
}
