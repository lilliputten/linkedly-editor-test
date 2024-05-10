import { observer } from 'mobx-react-lite';

import { TDemoComponent } from 'src/core/types';
import { useAppSessionStore } from 'src/store';
import { getAppDataInfo, useAppDataStore } from 'src/store/AppDataStore';

export const DemoCheckDataStore: TDemoComponent = observer(() => {
  const appSessionStore = useAppSessionStore();
  const appDataStore = useAppDataStore();
  const {
    // prettier-ignore
    inited,
    finished,
    ready,
    loading,
    error,
    logged,
  } = appSessionStore;
  const {
    // prettier-ignore
    testData,
  } = appDataStore;
  return (
    <div className="DemoCheckDataStore">
      {/* ... */}
      <h1>DemoCheckDataStore</h1>
      <p>inited: {String(inited)}</p>
      <p>finished: {String(finished)}</p>
      <p>ready: {String(ready)}</p>
      <p>logged: {String(logged)}</p>
      <p>loading: {String(loading)}</p>
      <p>error: {String(error)}</p>
      <p>testData: {getAppDataInfo(testData)}</p>
    </div>
  );
});

DemoCheckDataStore.__title = 'Basic data store check';
