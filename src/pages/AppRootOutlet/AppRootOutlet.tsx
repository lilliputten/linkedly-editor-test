import { Outlet } from 'react-router-dom';

import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';

export function AppRootOutlet() {
  return (
    <FullScreenPageLayout scrollable>
      <Outlet />
    </FullScreenPageLayout>
  );
}
