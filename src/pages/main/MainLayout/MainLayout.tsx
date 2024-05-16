import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router-dom';

import { MainMenu } from 'src/components/Main/MainMenu';

import styles from './MainLayout.module.scss';

export function MainLayout() {
  return (
    <Stack className={styles.root} flex={1}>
      <MainMenu />
      <Outlet />
    </Stack>
  );
}
