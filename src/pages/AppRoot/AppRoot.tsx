import { AppWrapper } from 'src/ui/wrappers/AppWrapper';
import { AppRouterWrapper } from 'src/ui/wrappers/AppRouterWrapper';

export function AppRoot() {
  return (
    <AppWrapper>
      <AppRouterWrapper />
    </AppWrapper>
  );
}
