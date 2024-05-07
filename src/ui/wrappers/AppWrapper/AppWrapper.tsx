import { CoreUiWrapper } from 'src/ui/wrappers/CoreUiWrapper';
import { AppSessionStoreProvider } from 'src/store/AppSessionStore';
import { AppDataStoreProvider } from 'src/store/AppDataStore';
import { TPropsWithChildrenAndClassName } from 'src/core/types';

type TAppWrapperProps = TPropsWithChildrenAndClassName;

export function AppWrapper(props: TAppWrapperProps): JSX.Element {
  const { children, className } = props;
  return (
    <CoreUiWrapper className={className}>
      <AppSessionStoreProvider>
        {/* NOTE: AppDataStoreProvider can be situated on the lower level */}
        <AppDataStoreProvider>
          {/* TODO: Expose root control nodes or use custom hooks? */}
          {children}
        </AppDataStoreProvider>
      </AppSessionStoreProvider>
    </CoreUiWrapper>
  );
}
