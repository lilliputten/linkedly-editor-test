import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { FullScreenPageLayout } from 'src/ui/layouts/FullScreenPageLayout';
import { AppRouterNavigator } from 'src/ui/wrappers/AppRouterNavigator';
import { ShowData } from 'src/components/Data/ShowData';

export function AppPage() {
  return (
    <AppWrapper>
      <FullScreenPageLayout>
        <AppRouterNavigator>
          {/* Placeholder for the main app page content */}
          <ShowData />
        </AppRouterNavigator>
      </FullScreenPageLayout>
    </AppWrapper>
  );
}
