import React from 'react';

import { useCommonAppNavigation } from 'src/core/hooks/routes/useCommonAppNavigation';
import { TUser } from 'src/core/types';
import { ThemedLoaderSplash, Scrollable } from 'src/ui/Basic';

export function MainSurveysList() {
  useCommonAppNavigation();
  const [ready, setReady] = React.useState(false);
  const [users, setUsers] = React.useState<TUser[]>([]);
  // DEMO: Check mirage api: request sample data
  React.useEffect(() => {
    fetch('/api/surveys')
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
      })
      // TODO: Process errors
      .finally(() => {
        setReady(true);
      });
  }, []);
  /* // DEMO: Dummy list
   * const itemsCount = 1;
   * const items = Array.from(Array(itemsCount)).map((_, n) => <p key={n}>Item {n}</p>);
   */
  return (
    <>
      <Scrollable>
        <p>MainSurveysList</p>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </Scrollable>
      <ThemedLoaderSplash
        // prettier-ignore
        show={!ready}
        mode="cover"
        fullSize
      />
    </>
  );
}
