import { Outlet } from 'react-router-dom';

import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';

export function AppRootLayout() {
  return (
    <FullScreenPageLayout>
      <Outlet />
    </FullScreenPageLayout>
  );
}
